from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.address_crud import *

router = APIRouter()

# * post /address/ 
# * adds an address

@router.post("/address/", response_model=Address)
def create_address(token: Annotated[str, Depends(oauth2_scheme)], address: Address, db: Session = Depends(get_db)):
    
    print("address in address_router.py is getting hit:")
    
    return crud_create_address(db=db, address=address)

# * get /address/ 
# * gets all addresses 

@router.get("/address/", response_model=list[Address])
def get_addresses(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_addresses(db, skip=skip, limit=limit)

# * get /address/{address_id} 
# * gets one address by id

@router.get("/address/{address_id}", response_model=Address)
def get_address(token: Annotated[str, Depends(oauth2_scheme)], address_id:int, db: Session = Depends(get_db)):
    
    return crud_get_address_by_id(db, address_id=address_id)

