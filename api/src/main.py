
# ! test for sqlalchemy follow along
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
# from incase.middleware import JSONCaseTranslatorMiddleware
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
from datetime import date, time 
from pydantic import BaseModel,  validator, field_validator, HttpUrl
import uuid 
import traceback
from . import crud, models, schemas

from .database import SessionLocal, engine, create_all_tables

print("engine in main.py:", engine)

print("main.py is running")

create_all_tables()

models.SQLAlchemyBase.metadata.create_all(bind=engine)

api_app = FastAPI()

# api_app.add_middleware(JSONCaseTranslatorMiddleware)

origins = [
    "http://localhost/3000",
    # "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000"
    
]

api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # ensures database is always closed after a request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



#  **** User routes *** 


# * get /users/ 
# * returns all users  

@api_app.get("/users/", response_model=list[schemas.UserBase])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    users = crud.get_users(db, skip=skip, limit=limit)

    return users


# * get /users/{derby_name} 
# * returns one users 

@api_app.get("/users/{derby_name}", response_model=schemas.UserBase)
def get_user(derby_name: str, db: Session = Depends(get_db)):
    
    user = crud.get_user_by_derby_name(db, derby_name=derby_name)
    
    if derby_name is None: 
        raise HTTPException(status_code=404, detail=f"User with derby name {derby_name} not found.")
    
    return user

# * post /users/ 
# * creates a new user 

@api_app.post("/users/", response_model=schemas.UserBase)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    print(traceback.format_exc())
    print("you are hitting the users/post route!!!")
    
    db_user_email = crud.get_user_by_email(db, email=user.email)
    print("db_user_email:", db_user_email)
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_derby_name = crud.get_user_by_derby_name(db, derby_name=user.derby_name)
    if db_user_derby_name:
        raise HTTPException(status_code=400, detail="Derby name already registered")
    return crud.create_user(db=db, user=user)

# * put /users/{user_id} 
# * updates an existing user 

@api_app.put("/users/{user_id}", response_model=schemas.UserUpdate)
def update_user(user: schemas.UserUpdate, user_id: int, db: Session = Depends(get_db)):
    
    print('user in /users/{user_id}', user)
    
    db_user = crud.get_user_by_id(db, user_id=user_id)    
 
    if not db_user:
        raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
    return crud.update_user(db=db, user=user, user_id=user_id)

# * delete /users/{user_id} 
# * deletes an existing user 
# ! note you may have to add some security measures on this

@api_app.delete("/users/{user_id}", response_model=schemas.UserDelete)
def delete_user(user: schemas.UserDelete, user_id: int, db: Session = Depends(get_db)):
    
    print('user in /users/{user_id}', user)
    
    # ! this grabs the user_id from the parameter
    # db_user = crud.get_user_by_id(db, user_id=user_id)
    # ! this grabs the user_id from the passed in user object  
    db_user = crud.get_user_by_id(db, user_id=user.user_id)      
 
    if not db_user:
        raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
    return crud.delete_user(db=db, user=user, user_id=user.user_id)


#  **** Event routes *** 

# * get /events/ 
# * returns all events  

@api_app.get("/events/", response_model=list[schemas.EventBase])
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

# * get /bouts/ 
# * returns all bouts

@api_app.get("/bouts/", response_model=list[schemas.Bout])
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bouts = crud.get_bouts(db, skip=skip, limit=limit)
    return bouts

# * get /mixers/ 
# * returns all mixers

@api_app.get("/mixers/", response_model=list[schemas.Mixer])
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    mixers = crud.get_mixers(db, skip=skip, limit=limit)
    return mixers

# * post /bouts/ 
# * creates a new bout 

@api_app.post("/bouts/", response_model=schemas.EventBase)
def create_bout(bout: schemas.Bout, db: Session = Depends(get_db)):
    
    
    print(traceback.format_exc())
    print("you are hitting the bouts post route!!!")
    print("****** bout *****:", bout)
    print("****** bout.time_zone *****:", bout.time_zone)
    print("****** type bout.time_zone *****:", type(bout.time_zone))
   
    return crud.create_bout(db=db, bout=bout)

# * post /mixers/ 
# * creates a new mixer

@api_app.post("/mixers/", response_model=schemas.EventBase)
def create_mixer(mixer: schemas.Mixer, db: Session = Depends(get_db)):
    
    return crud.create_mixer(db=db, mixer=mixer)

# * put /bouts/{event_id} 
# * updates an existing user 

@api_app.put("/bouts/{event_id}", response_model=schemas.BoutUpdate)
def update_bout(bout: schemas.BoutUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /bouts/{event_id}', bout)
    
    db_bout = crud.get_bout_by_id(db, event_id=event_id)    
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud.update_bout(db=db, bout=bout, event_id=event_id)

# * put /bouts/{event_id} 
# * updates an existing user 

@api_app.put("/mixers/{event_id}", response_model=schemas.MixerUpdate)
def update_mixer(mixer: schemas.MixerUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /mixers/{event_id}', mixer)
    
    db_mixer = crud.get_mixer_by_id(db, event_id=event_id)    
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud.update_mixer(db=db, mixer=mixer, event_id=event_id)

# * delete /bouts/{event_id} 
# * deletes an existing bout
# ! note you may have to add some security measures on this

@api_app.delete("/bouts/{event_id}", response_model=schemas.EventDelete)
def delete_bout(bout: schemas.EventDelete, event_id: int, db: Session = Depends(get_db)):
    
    print('bout in /bouts/{event_id}', bout)
    
    # ! this grabs the user_id from the parameter
    # db_user = crud.get_user_by_id(db, user_id=user_id)
    # ! this grabs the user_id from the passed in user object  
    db_bout = crud.get_bout_by_id(db, event_id=bout.event_id)      
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud.delete_bout(db=db, bout=bout, event_id=bout.event_id)

# * delete /mixers/{event_id} 
# * deletes an existing mixer
# ! note you may have to add some security measures on this

@api_app.delete("/mixers/{event_id}", response_model=schemas.EventDelete)
def delete_bout(mixer: schemas.EventDelete, event_id: int, db: Session = Depends(get_db)):
    
    print('mixer in /mixers/{event_id}', mixer)
    
    # ! this grabs the user_id from the parameter
    # db_user = crud.get_user_by_id(db, user_id=user_id)
    # ! this grabs the user_id from the passed in user object  
    db_mixer = crud.get_mixer_by_id(db, event_id=mixer.event_id)      
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud.delete_mixer(db=db, mixer=mixer, event_id=mixer.event_id)