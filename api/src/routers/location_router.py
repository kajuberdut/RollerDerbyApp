from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.location_crud import *

router = APIRouter()

# * get /locations/ 
# * gets all locations 

@router.get("/locations/", response_model=list[Location])
def get_locations(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_locations(db, skip=skip, limit=limit)

# * get /locations/{location_id} 
# * gets one location by id

@router.get("/locations/{location_id}", response_model=Location)
def get_location(token: Annotated[str, Depends(oauth2_scheme)], location_id:int, db: Session = Depends(get_db)):
    
    return crud_get_location_by_id(db, location_id=location_id)
