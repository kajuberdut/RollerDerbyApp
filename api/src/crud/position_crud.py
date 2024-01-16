from sqlalchemy.orm import Session
from .. import models
from ..schemas.position_schema import * 

# * Create, Read, Update, Delete Positions in Database 


def crud_create_position(db: Session, position: Position):
    """Creates new position."""
    print("crud_create_position in position_crud.py", position)
    db_position = models.Position(position=position.position)
    db.add(db_position)
    db.commit()
    db.refresh(db_position)
    
    return db_position.position_id

def crud_get_positions(db: Session, skip: int = 0, limit: int = 100):
    """Retrieves all positions."""
    return db.query(models.Position).offset(skip).limit(limit).all()

def crud_get_position_by_id(db: Session, position_id: int):
    """Retrieves one position by position_id."""
    return db.query(models.Position).filter(models.Position.position_id == position_id).first()

def crud_get_position(db: Session, position: Position):
    """Retrieves one position by position."""
    return db.query(models.Position).filter(models.Position.position == position.position).first()

def crud_create_user_position(db: Session, user_id: int, position_id: int): 
    """Creates new user position."""
    db_user_position = models.UserPosition(user_id=user_id, position_id=position_id)
    db.add(db_user_position)
    db.commit()
    db.refresh(db_user_position)
    return db_user_position

def crud_get_user_position_by_id(db: Session, user_id: int, position_id: int): 
    """Retrieves user position by position_id."""
    return db.query(models.UserPosition).filter(models.UserPosition.user_id == user_id, models.UserPosition.position_id == position_id).first()

def crud_get_user_position(db: Session, skip: int = 0, limit: int = 100):
    """Retrieves all user positions."""
    return db.query(models.UserPosition).offset(skip).limit(limit).all()
    