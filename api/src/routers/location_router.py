from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.location_crud import *

router = APIRouter(
    prefix="/locations",
    tags=["locations"],
    dependencies=[Depends(oauth2_scheme)],
    # responses={404: {"description": "Not found"}}
)


# * get /locations/ 
# * gets all locations 

@router.get("/", response_model=list[Location])
def get_locations(limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_locations(db, limit=limit)

# * get /locations/{location_id} 
# * gets one location by id

@router.get("/{location_id}", response_model=Location)
def get_location(location_id:int, db: Session = Depends(get_db)):
    
    return crud_get_location_by_id(db, location_id=location_id)
