from fastapi import APIRouter, Depends 
from ..dependencies import get_and_validate_current_user, get_db

from ..crud.insurance_crud import *

router = APIRouter(
    prefix="/insurance",
    tags=["insurance"],
    dependencies=[Depends(get_and_validate_current_user)]
)

# * get /insurance/{insurance_id} 
# * gets one insurance by id

@router.get("/{insurance_id}", response_model=InsuranceOutput)
def get_insurance(insurance_id:int, db: Session = Depends(get_db)):
    
    return crud_get_insurance_by_id(db, insurance_id=insurance_id)

# * get /insurance/user 
# * gets all user insurances
# * debugging only 

@router.get("/user", response_model=list[UserInsurance])
def get_users_insurance(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud_get_user_insurance(db, skip=skip, limit=limit)
 
# * get /insurance
# * gets all insurances 
# * debugging only

@router.get("/", response_model=list[InsuranceOnly])
def get_insurances(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_insurances(db, skip=skip, limit=limit)