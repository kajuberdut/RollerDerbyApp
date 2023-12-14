from sqlalchemy.orm import Session

from . import models, schemas
from fastapi import Request
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias

# By creating functions that are only dedicated to interacting with the database (get a user or an item) independent of your path operation function, you can more easily reuse them in multiple parts and also add unit tests for them.

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_derby_name(db: Session, derby_name: str):
    return db.query(models.User).filter(models.User.derby_name == derby_name).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):

    return db.query(models.User).offset(skip).limit(limit).all()
    

def create_user(db: Session, user: schemas.UserCreate):
# def create_user(derby_name: str, email: str, password: str, db: Session, user: schemas.UserCreate):
    print("create user in crud.py is working")
    print("user in crud.py:", user)
    password = user.password + "notreallyhashed"
    
    db_user = models.User(derby_name=user.derby_name, email=user.email, hashed_password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

def update_user(db: Session, user: schemas.UserUpdate, user_id): 
    print("user in update user crud.py", user)
    # print("db_user in update_user crud.py", db_user)
    # db_user = db_user.model_dump()
    # print("new db_user after model_dump()", db_user)
 
    # if not db_user:
    #     raise HTTPException(status_code=400, detail="User with user id {user.user_id} doesnt exist.")
    print("you are hitting update_user in crud.py")
    
    # print("!!!!user['derby_name']", user['derby_name'])
    
    
    db_user = get_user_by_id(db, user_id)
    
    # db_user = {
    # "derby_name": user["derby_name"],
    # "email": user["email"]
    # }
    
    # user = {
    # "derby_name": user["derby_name"],
    # "email": user["email"]
    # }
    
    user = {
    "derby_name": user.derby_name,
    "email": user.email
    }
    
    print("db user in update user:", db_user)
    
    # db_user = {
    # "derby_name": db_user.derby_name,
    # "email": db_user.email
    # }
    
    # for field, value in user(exclude_unset=True).items():
    #     setattr(user, field, value)
    
    for field, value in user.items():
        # setattr(user, field, value)
        print("duh dudh duh duh")
        print("field:", field)
        print("value:", value)
        if value is not None: 
            setattr(db_user, field, value)
            print(f"Updating field: {field} with value: {value}")
            
    print("db_user UPDATED:", db_user)

    db.commit()
    # db.refresh(user)
    return user 
    
# *Events CRUD 

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.EventBase).offset(skip).limit(limit).all()

def get_bouts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Bout).offset(skip).limit(limit).all()

def get_mixers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Mixer).offset(skip).limit(limit).all()

def create_bout(db: Session, bout: schemas.Bout):

    db_bout = models.Bout(type=bout.type, time=bout.time, date=bout.date, theme=bout.theme, level=bout.level, co_ed=bout.co_ed, opposing_team=bout.opposing_team, team=bout.team)
     
    db.add(db_bout)
    db.commit()
    db.refresh(db_bout)
    
    return db_bout

def create_mixer(db: Session, mixer: schemas.Mixer):

    db_mixer = models.Mixer(type=mixer.type, time=mixer.time, date=mixer.date, theme=mixer.theme, level=mixer.level, co_ed=mixer.co_ed,  signup_link=mixer. signup_link)
     
    db.add(db_mixer)
    db.commit()
    db.refresh(db_mixer)
    
    return db_mixer