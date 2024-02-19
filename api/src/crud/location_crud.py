from sqlalchemy.orm import Session 
from .. import models
from ..schemas.location_schema import * 

# * Create, Read, Update, Delete Locations in Database 


def crud_create_location(db: Session, location: Location):
    """Create new location."""
    print("crud_create_location in location_crud.py:", location)
    
    db_location = models.Location(city=location.city, state=location.state)
    
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    
    return db_location.location_id

def crud_get_location_by_id(db: Session, location_id: int):
    """Retrieve a specific location by location_id."""
    return db.query(models.Location).filter(models.Location.location_id == location_id).first()

def crud_get_location(db: Session, location: Location):
    """Retrieve a specific location by city and state."""
    print("hitting crud_get_location in location_crud.py")
    
    return db.query(models.Location).filter(models.Location.city == location.city, models.Location.state == location.state).first()

def crud_get_locations(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all locations."""
    return db.query(models.Location).offset(skip).limit(limit).all()

