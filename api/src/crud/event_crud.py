from sqlalchemy.orm import Session
from .. import models
from ..schemas.event_schema import * 
import datetime
from sqlalchemy.sql import func

# * Create, Read, Update, Delete Events in Database 


def crud_get_events(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all events."""
    return db.query(models.EventBase).offset(skip).limit(limit).all()

def crud_get_events_by_type_date_location(db: Session, type: str, city: str = None, state: str = None, zip_code: str = None, start_date: str = None, end_date: str = None):
    """Retrieve all events by type, date and location."""

    query = db.query(models.EventBase).join(models.Address)
    query = query.filter(models.EventBase.type == type)

    if city is not None:
        query = query.filter(models.Address.city == city)
    if state is not None:
        query = query.filter(models.Address.state == state)
    if zip_code is not None:
        query = query.filter(models.Address.zip_code == zip_code)
    if start_date is not None and end_date is not None:
        print("START DATE AND END DATE ARE NOT NONE")
        query = query.filter(models.EventBase.date.between(start_date, end_date))
        print("QUERY IN CRUD.PY", query)
        
    events = query.order_by(models.EventBase.date).all()

    return events
 
def crud_create_bout(db: Session, bout: Bout):
    """Create a specific bout."""
    
    db_bout = models.Bout(type=bout.type, date=bout.date, address_id=bout.address_id, time=bout.time, time_zone=bout.time_zone, theme=bout.theme, description=bout.description, level=bout.level, co_ed=bout.co_ed, ruleset=bout.ruleset, floor_type=bout.floor_type, jersey_colors=bout.jersey_colors, opposing_team=bout.opposing_team, team=bout.team, group_id=bout.group_id, chat_id=bout.chat_id)
       
    db.add(db_bout)
    db.commit()
    db.refresh(db_bout)
    
    return db_bout


def crud_create_mixer(db: Session, mixer: Mixer):
    """Create a specific mixer."""

    db_mixer = models.Mixer(type=mixer.type, date=mixer.date, address_id=mixer.address_id, time=mixer.time, time_zone=mixer.time_zone, theme=mixer.theme, description=mixer.description, level=mixer.level, co_ed=mixer.co_ed, ruleset=mixer.ruleset, floor_type=mixer.floor_type, jersey_colors=mixer.jersey_colors, signup_link=mixer.signup_link, group_id=mixer.group_id, chat_id=mixer.chat_id)
     
    db.add(db_mixer)
    db.commit()
    db.refresh(db_mixer)
    
    return db_mixer

def crud_get_bout_by_id(db: Session, event_id: int):
    """Retrieve one bout by event_id."""
    return db.query(models.Bout).filter(models.Bout.event_id == event_id).first()

def crud_get_mixer_by_id(db: Session, event_id: int):
    """Retrieve one mixer by event_id."""
    return db.query(models.Mixer).filter(models.Mixer.event_id == event_id).first()

def crud_get_bouts(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all future bouts."""
    today = datetime.datetime.now().date()
    today_str = today.strftime("%Y-%m-%d")
    
    return db.query(models.Bout).filter(func.text(models.Bout.date) > today_str).order_by(models.Bout.date).offset(skip).limit(limit).all()

def crud_get_mixers(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all future mixers."""
   
    today = datetime.datetime.now().date()
    today_str = today.strftime("%Y-%m-%d")
    
    return db.query(models.Mixer).filter(func.text(models.Mixer.date) > today_str).order_by(models.Mixer.date).offset(skip).limit(limit).all()

def crud_get_bout_by_address_date_time_team_opposing_team(db: Session, bout: Bout): 
    """Retrieve one bout by address, date, time and opposing team."""
    return db.query(models.Bout).filter(models.Bout.address_id == bout.address_id, models.Bout.time == bout.time, models.Bout.date == bout.date, models.Bout.team == bout.team, models.Bout.opposing_team == bout.opposing_team).first()  

def crud_get_mixer_by_address_date_time_theme(db: Session, mixer: Mixer): 
    """Retrieve one mixer by address, date, time and theme."""
    print("**** mixer ******:", mixer)
    found_mixer = db.query(models.Mixer).filter(models.Mixer.address_id == mixer.address_id, models.Mixer.time == mixer.time, models.Mixer.date == mixer.date, models.Mixer.theme == mixer.theme).first()
    print("**** found mixer ***** ", found_mixer)
    return found_mixer  

def crud_update_bout(db: Session, bout: BoutUpdate, event_id): 
    """Update a specific bout by event_id."""

    db_bout = crud_get_bout_by_id(db, event_id)
    
    bout = {
    "type": bout.type,
    "date": bout.date,
    "address_id": bout.address_id,
    "time": bout.time,
    "time_zone": bout.time_zone, 
    "theme": bout.theme, 
    "description": bout.description, 
    "level": bout.level,
    "co_ed": bout.co_ed, 
    "ruleset": bout.ruleset,
    "floor_type": bout.floor_type,
    "jersey_colors": bout.jersey_colors,
    "opposing_team": bout.opposing_team, 
    "team": bout.team
    }

    for field, value in bout.items():
        if value is not None: 
            setattr(db_bout, field, value)
            print(f"Updating field: {field} with value: {value}")
            
    print("db_bout UPDATED:", db_bout)

    db.commit()

    return bout

def crud_update_mixer(db: Session, mixer: MixerUpdate, event_id): 
    """Update a specific mixer by event_id."""

    db_mixer = crud_get_mixer_by_id(db, event_id)
    
    mixer = {
    "type": mixer.type,
    "date": mixer.date,
    "address_id": mixer.address_id,
    "time": mixer.time,
    "time_zone": mixer.time_zone,
    "theme": mixer.theme, 
    "description": mixer.description,
    "level": mixer.level,
    "co_ed": mixer.co_ed, 
    "ruleset": mixer.ruleset,
    "jersey_colors": mixer.jersey_colors,
    "signup_link": mixer.signup_link
    }

    for field, value in mixer.items():
        if value is not None: 
            setattr(db_mixer, field, value)
            print(f"Updating field: {field} with value: {value}")
            
    print("db_bout UPDATED:", db_mixer)

    db.commit()

    return mixer

def crud_delete_bout(db: Session, bout: EventDelete, event_id): 
    """Delete a specific bout by event_id."""

    db_bout = crud_get_bout_by_id(db, event_id)    
        
    db.delete(db_bout)
    db.commit()
    
    return db_bout

def crud_delete_mixer(db: Session, mixer: EventDelete, event_id): 
    """Delete a specific mixer by event_id."""

    db_mixer = crud_get_mixer_by_id(db, event_id)      
        
    db.delete(db_mixer)
    db.commit()
    
    return db_mixer

