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

# *Events CRUD 

def get_events(db: Session, skip: int = 0, limit: int = 100):

    return db.query(models.Event).offset(skip).limit(limit).all()

def create_bout(db: Session, bout: schemas.Bout):
# def create_user(derby_name: str, email: str, password: str, db: Session, user: schemas.UserCreate):
    print("create bout in crud.py is working")
    print("bout in crud.py:", bout)
    
    db_bout = models.Bout(type=bout.type, time=bout.time, date=bout.date, theme=bout.theme, level=bout.level, co_ed=bout.co_ed, detail=bout.detail, )
    db.add(db_bout)
    db.commit()
    db.refresh(db_bout)
    
    return db_bout