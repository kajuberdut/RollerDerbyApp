from sqlalchemy.orm import Session 
from .. import models
from ..schemas.insurance_schema import * 


# * Create, Read, Update, Delete Insurances in Database


def crud_create_insurance(db: Session, insurance: Insurance):
    """Create create insurance."""
    print("crud_create_insurance in insurance_crud.py:", insurance.insurance_number)

    db_insurance = models.Insurance(type=insurance.type)
    db.add(db_insurance)
    db.commit()
    db.refresh(db_insurance)
    
    return db_insurance.insurance_id

def crud_create_user_insurance(db: Session, user_id: int, insurance_id: int, insurance_number: str): 
    """Create a user insurance relationship."""
    db_user_insurance = models.UserInsurance(user_id=user_id, insurance_id=insurance_id, insurance_number=insurance_number)
    db.add(db_user_insurance)
    db.commit()
    db.refresh(db_user_insurance)
    return db_user_insurance

def crud_get_insurance(db: Session, insurance: Insurance):
    """Retrieve one insurance by type."""
    return db.query(models.Insurance).filter(models.Insurance.type == insurance.type).first()

def crud_get_insurance_by_id(db: Session, insurance_id: int):
    """Retrieve one insurance by insurance_id."""
    return db.query(models.Insurance).filter(models.Insurance.insurance_id == insurance_id).first()

def crud_get_insurances(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all insurances."""
    return db.query(models.Insurance).offset(skip).limit(limit).all()

def crud_get_user_insurance_by_id(db: Session, user_id: int, insurance_id: int):
    """Retrieve user insurance by user_id and insurance_id."""
    return db.query(models.UserInsurance).join(models.Insurance).filter(models.UserInsurance.user_id == user_id, models.Insurance.insurance_id == insurance_id).first()

def crud_get_user_insurance(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all users insurances."""
    return db.query(models.UserInsurance).offset(skip).limit(limit).all()
    
