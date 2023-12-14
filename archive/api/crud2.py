import uuid
# nate for a later consideration uuids could be used as ids 
# its a spacial vs security debate 

def get_users(db: Session, skip: int = 0, limit: int = 100):
    # query_params = Request.query_params
    # filtered_query = db.query(models.User)
    # for key, value in query_params.items():
    #     if hasattr(models.User, key):
    #         filtered_query = filtered_query.filter(getattr(models.User, key) == value)
    return db.query(models.User).offset(skip).limit(limit).all()
    

    filtered_query = filtered_query.limit(100)
  
    return filtered_query.all()

# def update_user(user_id: uuid.UUID, derby_name: Optional[str] = None, password: str, email: Optional[str] = None, first_name: Optional[str] = None, last_name: Optional[str] = None, facebook_name: Optional[str] = None, about: Optional[str] = None, primary_number: Optional[int] = None, secondary_number: Optional[int] = None, level: Optional[str] = None, insurance: Optional[str] = None, location: Optional[str] = None, played_rulesets: list[str], associated_leagues: list[str], db: Session, user: schemas.UpdateUser): 
    
# def update_user(
#     user_id: uuid.UUID, 
#     derby_name: Optional[str] = None,
#     password: Optional[str] = None,
#     email: Optional[str] = None, 
#     first_name: Optional[str] = None, 
#     last_name: Optional[str] = None, 
#     facebook_name: Optional[str] = None, 
#     about: Optional[str] = None, 
#     primary_number: Optional[int] = None, 
#     secondary_number: Optional[int] = None, 
#     level: Optional[str] = None, 
#     insurance: Optional[str] = None, 
#     location: Optional[str] = None, 
#     played_rulesets: Optional[List[str]] = [], 
#     associated_leagues: Optional[List[str]] = [],
#     ) -> dict[str, Selection]:
    

def update_user(db: Session, user, update_data: schemas.UserBase):
    # ! come back to this and main.py to update the user. Still working on this but should be more simple I believe.
    
    print("***************************************************************")
    print("user in update_user crud.py:", user)
    print("user in update_user crud.py:", user.user_id)
    print("update_data in update_user crud.py:", update_data)
    print("type of update_data crud.py:", type(update_data))
    print("update_data.primary_number", update_data.primary_number)
    print("****************************************************************")
   # Update user attributes with non-None values from update_data
    
    user = get_user_by_id(db, user.user_id)
    # * note it seems like you should be able to pass this from the route. 
    for field, value in update_data.dict().items():
        if value is not None:
            setattr(user, field, value)
            
    user.ruleset.extend(update_data.ruleset or [])
    user.associated_leagues.extend(update_data.associated_leagues or [])
    
    db.commit()
    db.refresh(user)
    
    return user


# * hashed password tip 

# The SQLAlchemy model for User contains a hashed_password that should contain a secure hashed version of the password.

# But as what the API client provides is the original password, you need to extract it and generate the hashed password in your application.

# And then pass the hashed_password argument with the value to save.


# ! test for sqlalchemy follow along

# from sqlalchemy.orm import Session

# from . import models, schemas
# from models import models 
# from schemas import schemas
# import models
# import schemas

# print("crud.py is running")


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