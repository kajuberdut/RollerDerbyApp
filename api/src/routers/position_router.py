from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.position_crud import *

router = APIRouter(
    prefix="/positions",
    tags=["positions"],
    dependencies=[Depends(oauth2_scheme)],
)


# * get /positions/ 
# * gets all positions 

@router.get("/", response_model=list[Position])
def get_positions(limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_positions(db=db, limit=limit)

# * get /positions/{position_id} 
# * gets one position by id

@router.get("/{position_id}", response_model=Position)
def get_position(position_id:int, db: Session = Depends(get_db)):
    
    return crud_get_position_by_id(db=db, position_id=position_id)

# * get /positions/users
# * gets all user positions 
# ? testing only

@router.get("/users", response_model=list[UserPosition])
def get_users_positions(limit: int = 100, db: Session = Depends(get_db)):

     return crud_get_user_position(db=db, limit=limit)
