from fastapi import APIRouter, Depends 
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.insurance_crud import *

router = APIRouter()

# * get /user/insurance/ 
# * gets all user positions 

@router.get("/user/insurance/", response_model=list[UserInsurance])
def get_users_insurance(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud_get_user_insurance(db, skip=skip, limit=limit)
 
# * get /insurances/ 
# * gets all insurances 

@router.get("/insurance/", response_model=list[Insurance])
def get_insurances(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_insurances(db, skip=skip, limit=limit)

# * get /insurances/{insurance_id} 
# * gets one insurance by id

@router.get("/insurances/{insurance_id}", response_model=InsuranceOutput)
def get_insurance(token: Annotated[str, Depends(oauth2_scheme)], insurance_id:int, db: Session = Depends(get_db)):
    
    return crud_get_insurance_by_id(db, insurance_id=insurance_id)