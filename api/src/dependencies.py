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
    # print("***********************************************************")
    # print("user in authenticate user in dependencies.py:", user)
    # print("user in authenticate user.username in dependencies.py:", user.username)
    # print("user in authenticate user.password in dependencies.py:", user.password)
    # print("***********************************************************")
    # print("password in authenticate user", user.hashed_password)
    
    if not user:
        return False
    # calls verify password to compare the password the user submitted on the frontend to the hashed password on the backend 
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Creates an access token when a user logs in with the user_id inside of it."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

# ! this is for the ws routes but may may need to be added to other routes to get tokens to time out 

# def validate_token(token: str = Depends(oauth2_scheme)):
#     print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
#     print("HITTING VALIDATE TOKEN IN DEPENDENCIES.PY")
#     print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         print("hitting IN DEPENDENCIES.PY")
#         print("token, SECRET_KEY, algorithms=[ALGORITHM]", token, SECRET_KEY)
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         print("payload:", payload)
#         user_id = payload.get("sub")
#         print("user_id:", user_id)
#         if user_id is None:
#             raise credentials_exception
#         token_data = payload
#     except JWTError:
#         raise credentials_exception

#     return token_data


async def get_and_validate_current_user(db, token: Annotated[str, Depends(oauth2_scheme)]):
    """Authenticates the token and the user associated with the token and retuns user."""

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # returns user_id and expiration date from token
        payload = jwt.decode(token, SECRET_KEY)
        print(payload)

        user_id: int = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
        
        expiration_time = payload.get("exp")
        if expiration_time is None:
            raise credentials_exception
        
        # ensures token data is correct schema 
        token_data = TokenData(user_id=user_id)
        
    except JWTError:
        raise credentials_exception
    
    # retrieves user from database using user_id on token 
    user = crud_get_user_by_id(db, user_id=token_data.user_id)
    
    if user is None:
        raise credentials_exception
    return user
    