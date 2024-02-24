from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from typing import Annotated
import os
from dotenv import load_dotenv

from .crud.user_crud import *
from .schemas.token_schema import *

from .database import SessionLocal

load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
EXPIRE_MINS= os.environ.get("EXPIRE_MINS")
# REFRESH_EXPIRE_MINS= os.environ.get("REFRESH_EXPIRE_MINS")



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password):
    return pwd_context.hash(password)

def authenticate_user(db, username: str, password: str):
    # gets user from database by using the username that was submitted on the frontend
    user = crud_get_user_by_username(db, username)
    
    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Creates an access token when a user logs in with the user_id inside of it."""

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=int(EXPIRE_MINS))
    # expire = datetime.utcnow() + timedelta(minutes=int("1440"))

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

# def create_refresh_token(user_id: int, expires_delta: timedelta | None = None):
#     """Creates a refresh access token when a user logs in with the user_id inside of it."""
#     data = {
#         "sub": user_id,
#         "token_type": "refresh_token",
#         "exp": datetime.utcnow() + timedelta(minutes=int(REFRESH_EXPIRE_MINS))
#     }
#     refresh_encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    
#     return refresh_encoded_jwt


async def get_and_validate_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):

    """Authenticates the token and the user associated with the token and retuns user."""

    print("token in dependencies", token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
       
        # returns user_id and expiration date from token
        payload = jwt.decode(token, SECRET_KEY)
        print("payload", payload)
        
        if not payload: 
            raise credentials_exception

        user_id: int = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
        
        # ! getting rid of this for now. May come back to add it later.
        expiration_time = payload.get("exp")
        
        if expiration_time is None: 
            raise credentials_exception
            

        # ! this is necessary 
        token_data = TokenData(user_id=user_id)
        print("token_data", token_data)
                
    # ! I think this is catching the expired token so you dont need the above information 
    except JWTError:
        raise credentials_exception
        # raise HTTPException(
        #         status_code=status.HTTP_401_UNAUTHORIZED,
        #         detail="Issue with IDK note for debugging only",
        #         headers={"WWW-Authenticate": "Bearer"},
        #     )
    
    user = crud_get_user_by_id(db, user_id=token_data.user_id)
  
    if user is None:
        raise credentials_exception

    return user

async def get_and_validate_current_user_websocket(db, token: Annotated[str, Depends(oauth2_scheme)]):

    """Authenticates the token and the user associated with the token and retuns user for websockets only ."""
   
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials for websockets",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY)
 
        if not payload: 
            raise credentials_exception

        user_id: int = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
        
        expiration_time = payload.get("exp")
        
        if expiration_time is None: 
            raise credentials_exception

        token_data = TokenData(user_id=user_id)
                
    except JWTError:
        raise credentials_exception
 
    user = crud_get_user_by_id(db, user_id=token_data.user_id)

    if user is None:
        raise credentials_exception

    return user

# * this would be if you add disabled on a user to disable an account after no use.... 
# https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/
# async def get_current_active_user(
#     current_user: Annotated[User, Depends(get_and_validate_current_user)]
# ):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user