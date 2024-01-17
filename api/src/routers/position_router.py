from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.position_crud import *

router = APIRouter()

# * get /user/position/ 
# * gets all user positions 

@router.get("/user/position/", response_model=list[UserPosition])
def get_users_positions(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud_get_user_position(db, skip=skip, limit=limit)
 
# * get /positions/ 
# * gets all positions 

@router.get("/positions/", response_model=list[Position])
def get_positions(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_positions(db, skip=skip, limit=limit)

# * get /positions/{position_id} 
# * gets one position by id

@router.get("/positions/{position_id}", response_model=Position)
def get_position(token: Annotated[str, Depends(oauth2_scheme)], position_id:int, db: Session = Depends(get_db)):
    
    return crud_get_position_by_id(db, position_id=position_id)

