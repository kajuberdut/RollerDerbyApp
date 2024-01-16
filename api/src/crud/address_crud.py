from sqlalchemy.orm import Session 

from .. import models
from ..schemas.address_schema import * 

# * Create, Read, Update, Delete Address in Database 


def crud_create_address(db: Session, address: Address):
    """Create new address by data. """
    print("address in create_address!!!!!:", address)

    db_address = models.Address(street_address=address.street_address, city=address.city, state=address.state, zip_code=address.zip_code)
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    
    return db_address.address_id

def crud_get_address(db: Session, address: Address):
    """Retrieve a specific address by data."""
    return db.query(models.Address).filter(models.Address.street_address == address.street_address, models.Address.city == address.city, models.Address.state == address.state, models.Address.zip_code == address.zip_code).first()

def crud_get_address_by_id(db: Session, address_id: int):
    """Retrieve a specific address by address_id."""
    return db.query(models.Address).filter(models.Address.address_id == address_id).first()


def crud_get_addresses(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all addresses. """
    return db.query(models.Address).offset(skip).limit(limit).all()





