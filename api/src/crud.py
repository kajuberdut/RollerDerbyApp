from sqlalchemy.orm import Session

from . import models, schemas
from fastapi import Request
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
from sqlalchemy.orm import joinedload
from sqlalchemy import desc, select, join, or_, func
from sqlalchemy.ext.asyncio import AsyncSession




# By creating functions that are only dedicated to interacting with the database (get a user or an item) independent of your path operation function, you can more easily reuse them in multiple parts and also add unit tests for them.

# ! old get_user_by_id without many to many relationship of rulesets
# def get_user_by_id(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.user_id == user_id).first()

def get_user_by_id(db: Session, user_id: int):
    # ? note that this fails if the there is no associated ruleset I want to return ruleset if it is exists but if it doesn't exist I still want to return the user
    # user = db.query(models.User).options(joinedload(models.Ruleset.ruleset)).filter(models.User.user_id == user_id).first()
    # if user: 
    #     # print("^^^^^ user in get_user_by_id many to many relationship ^^^^^^", user)
    #     # print("user.ruleset[0].ruleset_id in crud.py:", user.ruleset[0].ruleset_id)
    #     return user
    # else: 
    #     user = db.query(models.User).filter(models.User.user_id == user_id)
    user = (
        db.query(models.User)
        .options(joinedload(models.User.ruleset).load_only("ruleset_id"))  # Load only ruleset_id initially
        .filter(models.User.user_id == user_id)
        .first()
    ) 
    print("*** user in get_user_by_id crud ***", user)
    print("*** user.username ***", user.username)
    print("*** user.user_id ***", user.user_id)
    print("*** user.ruleset in get_user_by_id crud ***", user.ruleset)
    
    # if user and user.ruleset:
    #     user = db.query(models.Ruleset).options(joinedload(models.Ruleset.ruleset)).filter(
    #         models.Ruleset.ruleset_id == user.ruleset_id
    #     ).first()
    #     print(" second user in get_user_by_id crud", user)
    return user

# def get_user_by_id_with_password(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.user_id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    print("username in get_user_by_username in crud.py", username)
    
    user = db.query(models.User).filter(models.User.username == username).first()
    print("user in crud.py", user)
    return user

# def get_user_by_username_login(db: Session, username: str):
#     user = db.query(models.User).filter(models.User.username == username).first()
    
#     print("user in get_user_by_username_login", user)
#     print("user.username:", user.username)
#     print("user.passsword:", user.password)
    
#     return user
  
# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).order_by(models.User.username).offset(skip).limit(limit).all()

def get_users(db: Session, city: str = None, state: str = None, username: str = None, skip: int = 0, limit: int = 100):
    print("city in crud.py:", city)
    print("state in crud.py", state)
    print("username in crud.py:", username)
    
    # ! note include users with no location unless filtered for outerjoin
    query = db.query(models.User).outerjoin(models.Location)
  
    if city is not None:
        query = query.filter(models.Location.city == city)
    if state is not None:
        query = query.filter(models.Location.state == state)
    if username is not None:
        query = query.filter(models.User.username.ilike(f"%{username}%"))
        
    users = query.order_by(models.User.username).offset(skip).limit(limit).all()

    print("users in get_users crud.py", users)
    return users

def get_bout_by_id(db: Session, event_id: int):
    return db.query(models.Bout).filter(models.Bout.event_id == event_id).first()

def get_bout_by_address_date_time_team_opposing_team(db: Session, bout: schemas.Bout): 
    return db.query(models.Bout).filter(models.Bout.address_id == bout.address_id, models.Bout.time == bout.time, models.Bout.date == bout.date, models.Bout.team == bout.team, models.Bout.opposing_team == bout.opposing_team).first()
    

def get_mixer_by_address_date_time_theme(db: Session, mixer: schemas.Mixer): 
    print("**** mixer ******:", mixer)
    found_mixer = db.query(models.Mixer).filter(models.Mixer.address_id == mixer.address_id, models.Mixer.time == mixer.time, models.Mixer.date == mixer.date, models.Mixer.theme == mixer.theme).first()
    print("**** found mixer ***** ", found_mixer)
    return found_mixer

def get_mixer_by_id(db: Session, event_id: int):
    return db.query(models.Mixer).filter(models.Mixer.event_id == event_id).first()


def create_user(db: Session, user: schemas.UserCreate):
# def create_user(derby_name: str, email: str, password: str, db: Session, user: schemas.UserCreate):
    print("create user in crud.py is working")
    print("user in crud.py:", user)
    
    db_user = models.User(username=user.username, email=user.email, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

def update_user(db: Session, user: schemas.UserUpdate, user_id): 
    print("user in update user crud.py", user)
    print("you are hitting update_user in crud.py")
      
    db_user = get_user_by_id(db, user_id)
    
    user = {
    # "derby_name": user.derby_name,
    "username": user.username,
    "email": user.email,
    "phone_number": user.phone_number,
    "first_name": user.first_name, 
    "last_name": user.last_name,
    "additional_info": user.additional_info,
    "facebook_name": user.facebook_name, 
    "about": user.about,
    "primary_number": user.primary_number, 
    "secondary_number": user.secondary_number,
    "level": user.level,
    # "ruleset_id": user.ruleset_id,
    # "position_id": user.position_id,
    "location_id": user.location_id,
    "associated_leagues": user.associated_leagues
    }
    
    print("db user in update user:", db_user)
    
    for field, value in user.items():
        print("field:", field)
        print("value:", value)
        if value is not None: 
            setattr(db_user, field, value)
            print(f"Updating field: {field} with value: {value}")
    
    print("db_user UPDATED:", db_user)

    db.commit()
    # db.refresh(user)
    return user 

def delete_user(db: Session, user: schemas.UserDelete, user_id): 
    # print("user in delete user crud.py", user)
    # print("you are hitting delete_user in crud.py")
      
    # db_user = get_user_by_id_with_password(db, user_id)
    db_user = get_user_by_id(db, user_id)
    print("!!!!! db_user!!!!! ", db_user)
    print("!!!!! db_user.user_id!!!!! ", db_user.user_id)
    
    # if db_user.password is not user.password: 
    #     ValueError("Incorrect password provided for user deletion.")
        
        
    db.delete(db_user)
    db.commit()
    
    # return db_user
    return {"user": "deleted"}

    
# *Events CRUD 

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.EventBase).offset(skip).limit(limit).all()

# !!!! YOU ARE HERE
# def get_events_by_type_date_location(db: Session, type: str, city: str, state: str, zip_code: str, start_date, end_date):
#     print("CRUD.PY IS RUNNING GET_EVENTS_BY_TYPE_LOCATION_DATE")
#     events = db.query(models.EventBase).join(models.Address).filter(models.EventBase.type == type).filter(models.Address.city == city).filter(models.Address.state == state).filter(models.Address.zip_code == zip_code).filter(models.EventBase.date.between(start_date, end_date))
    
#     print("events in get_events_by_type crud.py", events)
#     return events 

def get_events_by_type_date_location(db: Session, type: str, city: str = None, state: str = None, zip_code: str = None, start_date: str = None, end_date: str = None):
    print("CRUD.PY IS RUNNING GET_EVENTS_BY_TYPE_LOCATION_DATE")
    print("START_DATE", start_date)
    print("END_DATE", end_date)

    # Build the query dynamically, filtering only on non-None parameters
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

    print("events in get_events_by_type crud.py", events)
    return events

def get_bouts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Bout).order_by(models.Bout.date).offset(skip).limit(limit).all()

def get_mixers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Mixer).order_by(models.Mixer.date).offset(skip).limit(limit).all()

def create_bout(db: Session, bout: schemas.Bout):
    print("^^^^ BOUT in crud.py ^^^^^", bout)
    # db_bout = models.Bout(type=bout.type, date=bout.date, address_id=bout.address_id, time=bout.time, time_zone=bout.time_zone, theme=bout.theme, description=bout.description, level=bout.level, co_ed=bout.co_ed, ruleset=bout.ruleset, opposing_team=bout.opposing_team, team=bout.team, jersey_colors=bout.jersey_colors)
    
    print("bout.jersey_colors &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", bout.jersey_colors)

    
    db_bout = models.Bout(type=bout.type, date=bout.date, address_id=bout.address_id, time=bout.time, time_zone=bout.time_zone, theme=bout.theme, description=bout.description, level=bout.level, co_ed=bout.co_ed, ruleset=bout.ruleset, floor_type=bout.floor_type, jersey_colors=bout.jersey_colors, opposing_team=bout.opposing_team, team=bout.team)
   
    # db_bout = models.Bout(type=bout.type, date=bout.date, address_id=bout.address_id, time=bout.time, time_zone=bout.time_zone, theme=bout.theme, description=bout.description, level=bout.level, co_ed=bout.co_ed, ruleset=bout.ruleset, floor_type=bout.floor_type, opposing_team=bout.opposing_team, team=bout.team)
     
     
    db.add(db_bout)
    db.commit()
    db.refresh(db_bout)
    
    return db_bout

def create_mixer(db: Session, mixer: schemas.Mixer):

    db_mixer = models.Mixer(type=mixer.type, date=mixer.date, address_id=mixer.address_id, time=mixer.time, time_zone=mixer.time_zone, theme=mixer.theme, description=mixer.description, level=mixer.level, co_ed=mixer.co_ed, ruleset=mixer.ruleset, floor_type=mixer.floor_type, jersey_colors=mixer.jersey_colors, signup_link=mixer. signup_link)
     
    db.add(db_mixer)
    db.commit()
    db.refresh(db_mixer)
    
    return db_mixer

def update_bout(db: Session, bout: schemas.BoutUpdate, event_id): 

    db_bout = get_bout_by_id(db, event_id)
    
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

def update_mixer(db: Session, mixer: schemas.MixerUpdate, event_id): 

    db_mixer = get_mixer_by_id(db, event_id)
    
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

def delete_bout(db: Session, bout: schemas.EventDelete, event_id): 
    # print("user in delete user crud.py", user)
    # print("you are hitting delete_user in crud.py")
      
    # db_user = get_user_by_id_with_password(db, user_id)
    db_bout = get_bout_by_id(db, event_id)
    print("!!!!! db_bout!!!!! ", db_bout)
    print("!!!!! db_bout.event_id!!!!! ", db_bout.event_id)
    
    # if db_user.password is not user.password: 
    #     ValueError("Incorrect password provided for user deletion.")
        
        
    db.delete(db_bout)
    db.commit()
    
    return db_bout

def delete_mixer(db: Session, mixer: schemas.EventDelete, event_id): 

    db_mixer = get_mixer_by_id(db, event_id)
    print("!!!!! db_mixer!!!!! ", db_mixer)
    print("!!!!! db_mixer.event_id!!!!! ", db_mixer.event_id)
    
    # if db_user.password is not user.password: 
    #     ValueError("Incorrect password provided for user deletion.")
        
        
    db.delete(db_mixer)
    db.commit()
    
    return db_mixer

#  *** CRUD addresses ***


def create_address(db: Session, address: schemas.Address):
    print("address in create_address!!!!!:", address)
    # print("****** address.name *******", address.name)
    # db_address = models.Address(name=address.name, street_address=address.street_address, city=address.city, state=address.state, zip_code=address.zip_code)
    db_address = models.Address(street_address=address.street_address, city=address.city, state=address.state, zip_code=address.zip_code)
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    
    return db_address.address_id
    # ! note if for some reason you want to add an address seperately and not with a bout or mixer you will have to return the full address and not the id or it doesnt conform to the route but works for insomnia for testing
    # return db_address
    

def get_addresses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Address).offset(skip).limit(limit).all()

def get_address(db: Session, address: schemas.Address):
    return db.query(models.Address).filter(models.Address.street_address == address.street_address, models.Address.city == address.city, models.Address.state == address.state, models.Address.zip_code == address.zip_code).first()

def get_address_by_id(db: Session, address_id: int):
    return db.query(models.Address).filter(models.Address.address_id == address_id).first()
# def get_user_by_id(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.user_id == user_id).first()

#  *** CRUD rulesets ***

def get_rulesets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ruleset).offset(skip).limit(limit).all()

# ! get ruleset for one to many relationship 
# def get_ruleset(db: Session, ruleset: schemas.Ruleset):
    
#     test = db.query(models.Ruleset).filter(models.Ruleset.wftda == ruleset.wftda, models.Ruleset.usars == ruleset.usars, models.Ruleset.banked_track == ruleset.banked_track, models.Ruleset.short_track == ruleset.short_track).first()
    
#     print("&&& test &&&", test)
  
#     return test

# ! get ruleset for many to many relationship 
def get_ruleset(db: Session, ruleset: schemas.Ruleset):
    return db.query(models.Ruleset).filter(models.Ruleset.name == ruleset.name).first()

def get_ruleset_by_id(db: Session, ruleset_id: int):
    return db.query(models.Ruleset).filter(models.Ruleset.ruleset_id == ruleset_id).first()

# ! create ruleset one to many relationship 
# # def create_ruleset(db: Session, wftda: bool, usars: bool, banked_track: bool, short_track:bool):
# def create_ruleset(db: Session, ruleset: schemas.Ruleset):
# #     print("ruleset in create_ruleset!!!!!:", wftda, usars, banked_track, short_track)
#     # print("****** address.name *******", address.name)
#     # db_address = models.Address(name=address.name, street_address=address.street_address, city=address.city, state=address.state, zip_code=address.zip_code)
#     # db_ruleset = models.Ruleset(wftda=ruleset.wftda, usars=ruleset.usars, banked_track=ruleset.banked_track, short_track=ruleset.short_track)
#     db_ruleset = models.Ruleset(wftda=ruleset.wftda, usars=ruleset.usars, banked_track=ruleset.banked_track, short_track=ruleset.short_track)
#     db.add(db_ruleset)
#     db.commit()
#     db.refresh(db_ruleset)
    
#     return db_ruleset.ruleset_id
#     # return db_address

# ! create ruleset many to many relationship 
def create_ruleset(db: Session, ruleset: schemas.Ruleset):
    print("rulset in create_rulset CRUD", ruleset)
    db_ruleset = models.Ruleset(name=ruleset.name)
    db.add(db_ruleset)
    db.commit()
    db.refresh(db_ruleset)
    
    return db_ruleset.ruleset_id

# *** CRUD user ruleset *** 

def get_user_ruleset_by_id(db: Session, user_id: int, ruleset_id: int): 
    return db.query(models.UserRuleset).filter(models.UserRuleset.user_id == user_id, models.UserRuleset.ruleset_id == ruleset_id).first()

def get_user_ruleset(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.UserRuleset).offset(skip).limit(limit).all()
    
def create_user_ruleset(db: Session, user_id: int, ruleset_id: int): 
    db_user_ruleset = models.UserRuleset(user_id=user_id, ruleset_id=ruleset_id)
    db.add(db_user_ruleset)
    db.commit()
    db.refresh(db_user_ruleset)
    return db_user_ruleset
    
#  *** CRUD positions ***

def get_positions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Position).offset(skip).limit(limit).all()

# ! get position for many to many relationship 
def get_position(db: Session, position: schemas.Position):
    
    return db.query(models.Position).filter(models.Position.position == position.position).first()


def get_position_by_id(db: Session, position_id: int):
    return db.query(models.Position).filter(models.Position.position_id == position_id).first()

# ! create_position many to many relationship 

def create_position(db: Session, position: schemas.Position):
    print("position in create_position CRUD", position)
    db_position = models.Position(position=position.position)
    db.add(db_position)
    db.commit()
    db.refresh(db_position)
    
    return db_position.position_id

# ! get position one to many relationship
# def get_position(db: Session, position: schemas.Position):
    
#     # test = db.query(models.Ruleset).filter(models.Ruleset.wftda == ruleset.wftda, models.Ruleset.usars == ruleset.usars, models.Ruleset.banked_track == ruleset.banked_track, models.Ruleset.short_track == ruleset.short_track).first()
    
#     # print("&&& test &&&", test)
  
#     # return test
    
#     return db.query(models.Position).filter(models.Position.jammer == position.jammer, models.Position.pivot == position.pivot, models.Position.blocker == position.blocker).first()

# def get_position_by_id(db: Session, position_id: int):
#     return db.query(models.Position).filter(models.Position.position_id == position_id).first()

# ! create position one to many relationship 
# def create_position(db: Session, position: schemas.Position):
#     # print("****** address.name *******", address.name)
#     # db_address = models.Address(name=address.name, street_address=address.street_address, city=address.city, state=address.state, zip_code=address.zip_code)
#     # db_ruleset = models.Ruleset(wftda=ruleset.wftda, usars=ruleset.usars, banked_track=ruleset.banked_track, short_track=ruleset.short_track)
#     db_position = models.Position(jammer=position.jammer, pivot=position.pivot, blocker=position.blocker)
#     db.add(db_position)
#     db.commit()
#     db.refresh(db_position)
    
#     return db_position.position_id

# *** CRUD user position *** 

def get_user_position_by_id(db: Session, user_id: int, position_id: int): 
    return db.query(models.UserPosition).filter(models.UserPosition.user_id == user_id, models.UserPosition.position_id == position_id).first()

def get_user_position(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.UserPosition).offset(skip).limit(limit).all()
    
def create_user_position(db: Session, user_id: int, position_id: int): 
    db_user_position = models.UserPosition(user_id=user_id, position_id=position_id)
    db.add(db_user_position)
    db.commit()
    db.refresh(db_user_position)
    return db_user_position

#  *** CRUD insurances ***

def get_insurances(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Insurance).offset(skip).limit(limit).all()

def get_insurance(db: Session, insurance: schemas.Insurance):
    
    return db.query(models.Insurance).filter(models.Insurance.type == insurance.type).first()

def get_insurance_by_id(db: Session, insurance_id: int):
    return db.query(models.Insurance).filter(models.Insurance.insurance_id == insurance_id).first()

# ! NOTE THAT YOU PROBABLY NEED TO ENTER THE INSURANCE NUMBER AS WELL.... NEED TO FIGURE THAT OUT
def create_insurance(db: Session, insurance: schemas.Insurance):
    print("insurance.insurance_number:", insurance.insurance_number)
    print("insurance.type in create_insurance CRUD", insurance.type)
    print("insurance in create_insurance CRUD", insurance)
    # print("insurance.insurance_number:", insurance.insurance_number)
    db_insurance = models.Insurance(type=insurance.type)
    db.add(db_insurance)
    db.commit()
    db.refresh(db_insurance)
    
    return db_insurance.insurance_id

#  *** CRUD user insurance ***

def get_user_insurance_by_id(db: Session, user_id: int, insurance_id: int): 
    return db.query(models.UserInsurance).join(models.Insurance).filter(models.UserInsurance.user_id == user_id, models.Insurance.insurance_id == insurance_id).first()

def get_user_insurance(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.UserInsurance).offset(skip).limit(limit).all()
    
def create_user_insurance(db: Session, user_id: int, insurance_id: int, insurance_number: str): 
    db_user_insurance = models.UserInsurance(user_id=user_id, insurance_id=insurance_id, insurance_number=insurance_number)
    db.add(db_user_insurance)
    db.commit()
    db.refresh(db_user_insurance)
    return db_user_insurance

#  *** CRUD locations ***

def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Location).offset(skip).limit(limit).all()

def get_location(db: Session, location: schemas.Location):
    print("hitting location in crud")
    
    return db.query(models.Location).filter(models.Location.city == location.city, models.Location.state == location.state).first()

def get_location_by_id(db: Session, location_id: int):
    return db.query(models.Location).filter(models.Location.location_id == location_id).first()

def create_location(db: Session, location: schemas.Location):
    print("!!!!! location in crud.py !!!!!!:", location)
    
    db_location = models.Location(city=location.city, state=location.state)
    
    print("*** db_location *****", db_location)
    print("*** db_location.location_id *****", db_location.location_id)
    
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    
    return db_location.location_id
   
#  *** CRUD messages ***

# ! come back to this HERE HERE HERE 


def get_messages(db: Session, skip: int = 0, limit: int = 100):
    print("hitting crud get messages")
    return db.query(models.Message).offset(skip).limit(limit).all()

def get_user_message(db: Session, skip: int = 0, limit: int = 100):
    print("hitting crud get user messages")
    return db.query(models.UserMessage).offset(skip).limit(limit).all()

# def get_chat_history(db: Session, user_id: int, participant_ids: List[int]) -> List[dict]:
def get_messages_by_chat_id(db: Session, chat_id: int):
    """Retrieves chat history between a user and specified participants."""
    print("hitting get_messages_by_chat_id in CRUD.py")

    messages = db.query(models.Message).filter(models.Message.chat_id == chat_id).all()

    message_objects = []
    
    for message in messages:
        
        message_object = {
            "message_id": message.message_id,
            "chat_id": message.chat_id,
            "user_id": message.sender_id,
            "message": message.message,
            "date_time": message.date_time
        }
        message_objects.append(message_object)
    
    return message_objects

def get_messages_with_user_ids(db: Session, skip: int = 0, limit: int = 100):
    print("Fetching messages with user IDs...")
  
    messages = (
        db.query(models.Message)
        .options(joinedload(models.Message.user))  # Eagerly load users
        .offset(skip)
        .limit(limit)
        .all()
    )

    return messages

def create_message(db: Session, message: schemas.Message):
    print("message in create_message CRUD", message)
    print("message.message in create_message CRUD", message['message'])
    print("Before addig message to db")
    
    
    db_message = models.Message(chat_id=message["chat_id"], message=message['message'], date_time=message['date_time'], sender_id=message["sender_id"])
    print("After adding message to db")
    print("db_message!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", db_message)
    print("db_message.message_id", db_message.message_id)
    print("db_message.message", db_message.message)
    # ! this line is breaking it  print("db_message['message_id']", db_message["message"])
    print("db_message.message_id", db_message.message_id)
    
    db.add(db_message)
    
    db.commit()
    db.refresh(db_message)
    
    return db_message.message_id

def create_user_message(db: Session, sender_id: int, message_id: int, participant_ids: list[int]): 
    db_user_message = models.UserMessage(sender_id=sender_id, message_id=message_id, participant_ids=participant_ids)
    db.add(db_user_message)
    db.commit()
    db.refresh(db_user_message)
    return db_user_message

def get_message_by_id(db: Session, message_id: int): 
    return db.query(models.Message).filter(models.Message.message_id == message_id).first()

def delete_message(db: Session, message_id: int):
    db_message = get_message_by_id(db, message_id)      
        
    db.delete(db_message)
    db.commit()
    
    return db_message

# def get_messages(db: Session, skip: int = 0, limit: int = 100):
#     print("hitting crud get messages")
#     return db.query(models.Message).offset(skip).limit(limit).all()

# def get_user_message(db: Session, skip: int = 0, limit: int = 100):
#     print("hitting crud get user messages")
#     return db.query(models.UserMessage).offset(skip).limit(limit).all()

# # def get_chat_history(db: Session, user_id: int, participant_ids: List[int]) -> List[dict]:
# def get_chat_history(db: Session):
#     """Retrieves chat history between a user and specified partipantss."""
#     print("hitting get_chat_history in CRUD.py")
#     messages = (
#         db.query(models.Message, models.User, models.UserMessage.participant_ids)
#         .join(models.UserMessage, models.UserMessage.message_id == models.Message.message_id)  # Join with UserMessage
#         .join(models.User, models.User.user_id == models.UserMessage.sender_id)  # Join with User
#         # .filter(Message.sender_id == 3)  # Filter by sender ID
#         # .filter(User.id())  # Filter by partipants IDs
#         .order_by(models.Message.date_time.asc())
#         .all()
#     )

#     message_objects = []
    
#     for message, sender, participant_ids in messages:
        
#         message_object = {
#             "message_id": message.message_id,
#             "sender_id": sender.user_id,
#             "participant_ids": participant_ids,
#             "message": message.message,
#             "date_time": message.date_time
#         }
#         message_objects.append(message_object)
    
#     return message_objects

# def get_messages_with_user_ids(db: Session, skip: int = 0, limit: int = 100):
#     print("Fetching messages with user IDs...")
  
#     messages = (
#         db.query(models.Message)
#         .options(joinedload(models.Message.user))  # Eagerly load users
#         .offset(skip)
#         .limit(limit)
#         .all()
#     )

#     return messages

# # def create_message(db: Session, message_id: int, message: str, date_time: str):

# def create_message(db: Session, message: schemas.Message):
#     print("message in create_message CRUD", message)

#     db_message = models.Message(message=message['message'], date_time=message['date_time'], chat_id=message['chat_id'])

#     db.add(db_message)
#     db.commit()
#     db.refresh(db_message)
    
#     return db_message.message_id

# def create_user_message(db: Session, sender_id: int, message_id: int): 
#     db_user_message = models.UserMessage(sender_id=sender_id, message_id=message_id)
#     db.add(db_user_message)
#     db.commit()
#     db.refresh(db_user_message)
#     return db_user_message

# def get_message_by_id(db: Session, message_id: int): 
#     return db.query(models.Message).filter(models.Message.message_id == message_id).first()

# def delete_message(db: Session, message_id: int):
#     db_message = get_message_by_id(db, message_id)      
        
#     db.delete(db_message)
#     db.commit()
    
#     return db_message


#  *** CRUD chats ***

def create_chat(db: Session, chat: schemas.Chat):
    
    # db_chat = models.Chat(participant_ids=chat['participant_ids'], name="testing")
    db_chat = models.Chat(group_id=chat['group_id'])
    
    print("*** !!!!!!!!!!!! db_chat !!!!!!!!!!!!!!!! *****", db_chat)
    
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    
    return db_chat

# def get_chat_by_id(db: Session, chat_id: int):
#     print("!!!!! get_chat_by_id in crud.py !!!!!!:", chat_id)
    
#     return db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()

# def get_chat_id_by_participants(db: Session, participant_ids: list[int]):
#     print("!!!!! get_chat_by_participant_id in crud.py !!!!!!:", participant_ids)
    
#     chat_db = db.query(models.Chat).filter(models.Chat.participant_ids == participant_ids).first()
    
#     print("!!!!!!!!!!!! chat_db", chat_db)

#     return chat_db

def get_chat_by_group_id(db: Session, group_id: int):
    print("!!!!! get_chat_by_id in crud.py !!!!!!:", group_id)
    
    return db.query(models.Chat).filter(models.Chat.group_id == group_id).first()

def get_chats_by_group_ids(db: Session, group_ids: list[int]):
    print("!!!!! get_chats_by_group_ids in crud.py !!!!!!:", group_ids)

    # chats = db.query(models.Chat).filter(models.Chat.group_id.in_(group_ids)).all()
    
    chats = db.query(models.Chat, models.Group.name) \
          .join(models.Group, models.Chat.group_id == models.Group.group_id) \
          .filter(models.Chat.group_id.in_(group_ids)) \
          .all()
     
    chat_objects = []
    
    for chat in chats:
        print("chat in chats!!!!!!!!!!!", chat)
        print("!!!!!!! chat[0]:", type(chat[0].chat_id))
        print("chat[1] in chats!!!!!!!!!!!", chat[1])
        chat_object = {
            "chat_id": chat[0].chat_id,
            "name": chat[1],
        }
        print("before appending chat_objects")
        chat_objects.append(chat_object)
        print("after appending chat_objects")
    
    return chat_objects
    

def get_chats_by_user_id(db: Session, user_id: int):
    
    print("!!!!! get_chats_by_user_id in crud.py !!!!!!:", user_id)
    
    chats = db.query(models.Chat).filter(models.Chat.participant_ids.any(user_id)).all()
    
    print("!!!!!!!!!!!! chats", chats)

    return chats

#  *** CRUD groups ***

def create_group(db: Session, group: schemas.CreateGroup):
    print("create group is running in crud.py")
    print("group in create group crud.py:", group)
    db_group = models.Group(name=group['name'])
    
    # print("*** !!!!!!!!!!!! db_chat !!!!!!!!!!!!!!!! *****", db_group)
    # print("*** db_chat.chat_id *****", db_group.group_id)
    # # print("*** db_chat['chat_id'] *****", db_chat['chat_id'])
    # print("*** db_chat.participant_ids *****", db_group.participant_ids)
    # print("*** db_chat.name *****", db_group.name)
    
    
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    
    return db_group

def get_group_id_by_participants(db: Session, participant_ids: list[int]):
    print("!!!!! get_group_by_participant_id in crud.py !!!!!!:", participant_ids)
    
    # group_db = db.query(models.Group).join(models.UserGroup).join(models.User).filter(models.User.user_id.in_(participant_ids)).first()
    # group_db = db.query(models.Group).join(models.UserGroup).join(models.User).filter(models.UserGroup.participant_ids == participant_ids).first()
    
    group_db = (
        db.query(models.Group)
        .join(models.UserGroup)
        .join(models.User)
        .filter(models.User.user_id.in_(participant_ids))
        .group_by(models.Group.group_id)  # Group by group ID
        .having(func.count(models.User.user_id.distinct()) == len(participant_ids))  # Count distinct users
        .first()
    )
    
    
    return group_db

def add_user_to_group(db: Session, user_group: schemas.UserGroup):
    
    db_user_group = models.UserGroup(user_id=user_group['user_id'], group_id=user_group['group_id'])
    
    db.add(db_user_group)
    db.commit()
    db.refresh(db_user_group)
    
    return db_user_group

def get_groups_by_participant(db: Session, user_id: int):
    print("!!!!! get_groups_by_participant in crud.py !!!!!!:", user_id)
    
    # groups_db = db.query(models.Group).join(models.UserGroup).join(models.User).filter(models.User.user_id.in_(user_id)).all()
    
    # groups_db = db.query(models.Group).join(models.UserGroup.user_id == user_id).all()
    groups_db = db.query(models.Group).join(models.UserGroup).filter(models.UserGroup.user_id == user_id).all()
    
    print("!!!!!!!!!!!!!!!! groups_db:", groups_db)
    
    return groups_db
