
# ! test for sqlalchemy follow along

# from sqlalchemy.orm import Session

# from . import models, schemas
# from models import models 
# from schemas import schemas
# import models
# import schemas

print("crud.py is running")


# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()


# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()


# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()


# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item




from sqlalchemy.orm import Session

from . import models, schemas

# By creating functions that are only dedicated to interacting with the database (get a user or an item) independent of your path operation function, you can more easily reuse them in multiple parts and also add unit tests for them.

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def add_user(db: Session, user: schemas.UserCreate):
    password = user.password + "notreallyhashed"
    db_user = models.User(user_id="32e397b9-f703-4215-b68a-911466131b79",derby_name="Wicked Bitch of the West", email="this@mail.com", hashed_password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# * hashed password tip 

# The SQLAlchemy model for User contains a hashed_password that should contain a secure hashed version of the password.

# But as what the API client provides is the original password, you need to extract it and generate the hashed password in your application.

# And then pass the hashed_password argument with the value to save.