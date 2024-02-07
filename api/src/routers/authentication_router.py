from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Annotated
from ..dependencies import get_db, oauth2_scheme, get_and_validate_current_user, authenticate_user, create_access_token, create_refresh_token


from fastapi.security import OAuth2PasswordRequestForm

from ..schemas.token_schema import *
# from ..schemas.location_schema import *

# from ..crud.address_crud import *
from ..crud.chat_crud import *
# from ..crud.event_crud import *
from ..crud.group_crud import *
# from ..crud.insurance_crud import *
# from ..crud.location_crud import *
from ..crud.message_crud import *
# from ..crud.position_crud import *
from ..crud.user_crud import *

router = APIRouter()


# # * get /token 
# # * login one user and provide token 

@router.post("/token",  response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
 
    # authenticates user and then returns user 
   
    user = authenticate_user(db, form_data.username, form_data.password)
    print("user in main.py:", user)
    if not user:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect username or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )
    
    access_token = create_access_token(data={"sub": str(user.user_id)})
    # refresh_token = create_refresh_token(data={"sub": str(user.user_id)})
        
    # access_token = create_access_token(data={"sub": user.user_id})
    # ! note that I just adjusted the user.user_id to be a string instead of a number

    return {"access_token": access_token, "token_type": "bearer"}

# # * get /refresh
# # * login one user and provide token 

@router.post("/refresh",  response_model=Token)
async def refresh(refresh_token: Annotated[get_and_validate_current_user, Depends()], db: Session = Depends(get_db)):
    
    # * Not sure exactly what I am doing with this but if I can authenticate the refresh token then you can create a new access token???? 
     
 
    # authenticates user and then returns user 
    
    new_access_token = create_access_token(data={"sub": str(user.user_id)})

    return {"access_token": new_access_token, "token_type": "bearer"}


# # * get /login/{user_id} 
# # * returns one specific user by user_id
# ! unknown if this is the issue???? 

# @router.get("/login/{user_id}", response_model=UserDetailsPrivate)
# def get_user(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db)):
@router.get("/login/{user_id}", response_model=UserDetailsPrivate)
def get_user(token: Annotated[str, Depends(get_and_validate_current_user)], user_id: int, db: Session = Depends(get_db)):

    print("users/user_id is running")
    
    user = crud_get_user_by_id(db, user_id=user_id)

    if user is None: 
        raise HTTPException(status_code=404, detail=f"User with user id of {user_id} not found.")  
    
    return user
