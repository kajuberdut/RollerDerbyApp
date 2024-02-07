from fastapi import APIRouter, Depends, HTTPException 
from ..dependencies import get_db, hash_password

from ..schemas.user_schema import *
from ..schemas.location_schema import *

from ..crud.user_crud import *

router = APIRouter(
    prefix="/users",
    tags=["users"]
)



# * post /users
# * creates a new user 

@router.post("/", response_model=UserBase, dependencies=[])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    print("you are hitting the users/post route!!!")
    
    hashed_password = hash_password(user.password)

    user.password = hashed_password   

    db_user_email = crud_get_user_by_email(db, email=user.email)
    
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_username = crud_get_user_by_username(db, username=user.username)
    if db_user_username:
        raise HTTPException(status_code=400, detail="Derby name already registered")
    
    return crud_create_user(db=db, user=user)