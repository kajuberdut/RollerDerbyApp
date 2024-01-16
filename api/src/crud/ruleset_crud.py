from sqlalchemy.orm import Session
from .. import models
from ..schemas.ruleset_schema import * 

# * Create, Read, Update, Delete Rulesets in Database 


def crud_create_ruleset(db: Session, ruleset: Ruleset):
    """Creates new ruleset."""
    print("rulset in create_rulset CRUD", ruleset)
    db_ruleset = models.Ruleset(name=ruleset.name)
    db.add(db_ruleset)
    db.commit()
    db.refresh(db_ruleset)
    
    return db_ruleset.ruleset_id

def crud_get_rulesets(db: Session, skip: int = 0, limit: int = 100):
    """Retrieves all rulesets."""
    return db.query(models.Ruleset).offset(skip).limit(limit).all()

def crud_get_ruleset_by_id(db: Session, ruleset_id: int):
    """Retrieves specific ruleset by ruleset_id."""
    return db.query(models.Ruleset).filter(models.Ruleset.ruleset_id == ruleset_id).first()

def crud_get_ruleset(db: Session, ruleset: Ruleset):
    """Retrieves specific ruleset by name."""
    return db.query(models.Ruleset).filter(models.Ruleset.name == ruleset.name).first()

def crud_create_user_ruleset(db: Session, user_id: int, ruleset_id: int): 
    """Creates new user ruleset."""
    db_user_ruleset = models.UserRuleset(user_id=user_id, ruleset_id=ruleset_id)
    db.add(db_user_ruleset)
    db.commit()
    db.refresh(db_user_ruleset)
    return db_user_ruleset

def crud_get_user_ruleset(db: Session, skip: int = 0, limit: int = 100):
    """Retrieves all users rulesets."""
    return db.query(models.UserRuleset).offset(skip).limit(limit).all()

def crud_get_user_ruleset_by_id(db: Session, user_id: int, ruleset_id: int):
    """Retrieves specific user ruleset by ruleset_id and user_id.""" 
    return db.query(models.UserRuleset).filter(models.UserRuleset.user_id == user_id, models.UserRuleset.ruleset_id == ruleset_id).first()

    






