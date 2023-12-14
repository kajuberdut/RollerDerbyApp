
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



# #  **** User routes *** 


# * get /users/ 
# * returns all users  

@api_app.get("/users/", response_model=list[schemas.UserBase])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


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

# @api_app.post("/users/", response_model=schemas.UserBase)
# def update_user()


# #  **** Event routes *** 

# * get /events/ 
# * returns all events  

@api_app.get("/events/", response_model=list[schemas.EventBase])
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events


@api_app.post("/bouts/", response_model=schemas.EventBase)
def create_bout(bout: schemas.Bout, db: Session = Depends(get_db)):
    
    print(traceback.format_exc())
    print("you are hitting the bouts post route!!!")
    
    # db_user_email = crud.get_event_by_email(db, email=user.email)
    # print("db_user_email:", db_user_email)
    # if db_user_email:
    #     raise HTTPException(status_code=400, detail="Email already registered")
    
    # db_user_derby_name = crud.get_user_by_derby_name(db, derby_name=user.derby_name)
    # if db_user_derby_name:
    #     raise HTTPException(status_code=400, detail="Derby name already registered")
    return crud.create_bout(db=db, bout=bout)