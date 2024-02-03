from sqlalchemy.orm import Session, joinedload
from .. import models
from ..schemas.user_schema import * 

# * Create, Read, Update, Delete Users in Database 

def crud_create_user(db: Session, user: UserCreate):
    """Creates new user."""
    print("crud_create_user in user_crud.py is working")
    
    db_user = models.User(username=user.username, email=user.email, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

def crud_get_users(db: Session, city: str = None, state: str = None, username: str = None, skip: int = 0, limit: int = 100):
    """Retrieves all users."""
    
    query = db.query(models.User).outerjoin(models.Location)
  
    if city is not None:
        query = query.filter(models.Location.city == city)
    if state is not None:
        query = query.filter(models.Location.state == state)
    if username is not None:
        query = query.filter(models.User.username.ilike(f"%{username}%"))
        
    users = query.order_by(models.User.username).offset(skip).limit(limit).all()

    # print("users in get_users crud.py", users)
    # print("users[0] in get_users crud.py", users[0])
    # print("users[0].image in get_users crud.py", users[0].image)
    
    return users

def crud_get_user_by_id(db: Session, user_id: int):
    """Retrieves user by user_id."""
    user = (
        db.query(models.User)
        .options(joinedload(models.User.ruleset).load_only("ruleset_id")) 
        .filter(models.User.user_id == user_id)
        .first()
    ) 
  
    return user

def crud_get_username_by_id(db: Session, user_id: int):
    """Retrieves username by user_id."""
    username = (
        db.query(models.User.username)
        .filter(models.User.user_id == user_id)
        .first()
    ) 
  
    return username

def crud_get_user_details_by_username(db: Session, username: str):
    """Retrieves user details by username."""
    user = (
        db.query(models.User)
        .filter(models.User.username == username)
        .first()
    ) 
    print("user in crud get user details by username", user)
    print("user.username", username)
    print("user.ruleset", user.ruleset)
  
    return user

def crud_get_user_by_email(db: Session, email: str):
    """Retrieves user by email."""
    return db.query(models.User).filter(models.User.email == email).first()

def crud_get_user_by_username(db: Session, username: str):
    """Retrieves user by username."""
    print("username in get_user_by_username in crud.py", username)
    
    user_login_data = db.query(models.User).filter(models.User.username == username).first()
    # print("user in crud.py", user)
    # print("user.user_id in crud.py", user.user_id)
    # print("user.user_id in crud.py", user.username)
    # print("user.user_id in crud.py", user.email)
    return user_login_data

def crud_get_user_id_by_username(db: Session, username: str):
    """Retrieves user id by username."""
    print("username in get_user_id_by_username in crud.py", username)
    
    db_user = db.query(models.User).filter(models.User.username == username).first()

    return db_user.user_id

# def crud_get_participant_usernames_by_ids(db: Session, user_ids: list[int]): 
    
#     usernames = db.query(models.User).filter(models.User.username == username).all

def crud_update_user(db: Session, user: UserUpdate, user_id): 
    """Updates user by user_id."""
    print("user in update user crud.py", user)
    print("you are hitting update_user in crud.py")
      
    db_user = crud_get_user_by_id(db, user_id)
    
    user = {
    "username": user.username,
    "email": user.email,
    "image": user.image,
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

    db.commit()
    return user 

def crud_update_profile_user(db: Session, user: UserUpdateProfile, user_id: int): 
    """Updates user profile by user_id."""
    print("user in update user crud.py", user)
    print("you are hitting update_user in crud.py")
      
    db_user = crud_get_user_by_id(db, user_id)
    
    print("db user in update user:", db_user)
    
    fields_to_update = {
        "image": user.image,
        "facebook_name": user.facebook_name,
        "about": user.about,
        "primary_number": user.primary_number,
        "level": user.level,
        "location_id": user.location_id,
        "associated_leagues": user.associated_leagues
    }

    for field, value in fields_to_update.items():
        print("field:", field)
        print("value:", value)
        if value is not None: 
            setattr(db_user, field, value)
            print(f"Updating field: {field} with value: {value}")

    db.commit()
    return user 

def crud_update_private_user(db: Session, user: UserUpdatePrivateDetails, user_id: int): 
    """Updates user private details by user_id."""
    print("user in update user crud.py", user)
    print("you are hitting update_user in crud.py")
      
    db_user = crud_get_user_by_id(db, user_id)
    
    print("db user in update private details user:", db_user)
    
    fields_to_update = {
        "email": user.email,
        "phone_number": user.phone_number,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "additional_info": user.additional_info,
        "secondary_number": user.secondary_number
    }

    for field, value in fields_to_update.items():
        print("field:", field)
        print("value:", value)
        if value is not None: 
            setattr(db_user, field, value)
            print(f"Updating field: {field} with value: {value}")

    db.commit()
    return user 

def crud_delete_user(db: Session, user: UserDelete, user_id): 
    """Deletes user by user_id."""

    db_user = crud_get_user_by_id(db, user_id)

    db.delete(db_user)
    db.commit()

    return {"user": "deleted"}