from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import get_db, get_and_validate_current_user

from ..crud.address_crud import *

router = APIRouter(
    prefix="/address",
    tags=["address"],
    dependencies=[Depends(get_and_validate_current_user)]
)

# * post /address/ 
# * adds an address

@router.post("/", response_model=Address)
def create_address(address: Address, db: Session = Depends(get_db)):
    
    print("address in address_router.py is getting hit:")
    
    return crud_create_address(db=db, address=address)

# * get /address/ 
# * gets all addresses 

@router.get("/", response_model=list[Address])
def get_addresses(limit: int = 100, db: Session = Depends(get_db)):

    return crud_get_addresses(db, limit=limit)

# * get /address/{address_id} 
# * gets one address by id

@router.get("/{address_id}", response_model=Address)
def get_address(address_id:int, db: Session = Depends(get_db)):
    
    return crud_get_address_by_id(db, address_id=address_id)

