from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models
from ..schemas.group_schema import * 
from ..crud.user_crud import *
from ..crud.team_invite_crud import *

# * Create, Read, Update, Delete Groups in Database 

# ! need to check this for creating a group and having type
def crud_create_group(db: Session, group: CreateGroup):
    """Create a specific group."""
    print("crud_create_group is running in group_crud.py", group)

    db_group = models.Group(name=group['name'])
   
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    
    return db_group


# todo note that you can refactor this one and the one above later.
def crud_create_team(db: Session, group: Group):
    """Create a specific group."""
    print("crud_create_group is running in group_crud.py", group)

    # db_team = models.Group(name=group['name'], admin=group['admin'], type=group['type'], participant_ids=group['admin'])
    
    db_team = models.Group(name=group['name'], admin=group['admin'], type=group['type'])
   
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    
    return db_team

def crud_get_group_by_group_id(db: Session, group_id: int):
    """Retrieve a specific group by group_id."""
    print("group_id", group_id)
    return db.query(models.Group).filter(models.Group.group_id == group_id).first()

def crud_get_group_id_by_participants(db: Session, participant_ids: list[int]):
    """Retrieve group_id by specific participant_ids."""
    print("get_group_by_participant_id in group_crud.py :", participant_ids)
    
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

def crud_add_user_to_group(db: Session, user_group: UserGroup):
    """Add user to user group."""
    print("user group in crud_add_user_to_group", user_group)

    existing_user_group = db.query(models.UserGroup).filter(
    models.UserGroup.user_id == user_group['user_id'],
    models.UserGroup.group_id == user_group['group_id']
    ).first()
    
    if existing_user_group: 
        print("existing_user_group is true")
        return existing_user_group
    
    db_user_group = models.UserGroup(user_id=user_group['user_id'], group_id=user_group['group_id'])
      
    db.add(db_user_group)
    db.commit()
    db.refresh(db_user_group)
    
    return db_user_group



def crud_get_groups_by_participant(db: Session, user_id: int):
    """Retrieve multiple groups by one participant_id ."""
    print("get_groups_by_participant in group_crud.py:", user_id)
 
    groups_db = db.query(models.Group).join(models.UserGroup).filter(models.UserGroup.user_id == user_id).all()
        
    return groups_db

def crud_get_group_id_by_chat_id(db: Session, chat_id: int):
    """Retrieve one group by one chat_id ."""
    print("get_group_by_chat_id in group_crud.py:", chat_id)
    # ! note that you could later want to return the name og the group instead of the group participants
    
    group_db = db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()
    print("group_db in group_crud.py !!!!!!!!!!!!!!!!!! ", group_db)
    
    group_id = group_db.group_id
    
    print("group_id !!!!!!!!!!!", group_id)
    
    return group_id
    
    
def crud_get_participant_usernames_by_group_id(db: Session, group_id: int):
    """Retrieve participant usersnames by group id"""
  
    participants_usernames = []
    
    participants_db = db.query(models.User) \
                      .join(models.UserGroup, models.User.user_id == models.UserGroup.user_id) \
                      .filter(models.UserGroup.group_id == group_id) \
                      .all()

    print("participants in group_crud.db", participants_db)
    
    for participant in participants_db:
        print("participant in loop", participant)
        participants_usernames.append(participant.username)

    return participants_usernames

def crud_get_participant_ids_by_group_id(db: Session, group_id: int):
    """Retrieve participant ids by group id"""
  
    participants_ids = []
    
    participants_db = db.query(models.User) \
                      .join(models.UserGroup, models.User.user_id == models.UserGroup.user_id) \
                      .filter(models.UserGroup.group_id == group_id) \
                      .all()

    print("participants in group_crud.db", participants_db)
    
    for participant in participants_db:
        print("participant in loop", participant)
        participants_ids.append(participant.user_id)

    return participants_ids


def crud_get_group_name_by_chat_id(db: Session, chat_id: int):
    """Retrieve multiple groups by one participant_id ."""
    print("get_group_name__by_chat_id in group_crud.py:", chat_id)
 
    chat_db = db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()
    print("chat_db", chat_db)
    print("group_id", chat_db.group_id)
    
    group_db = crud_get_group_by_group_id(db=db, group_id=chat_db.group_id)
    
    group_name = group_db.name
    print("group_name in get_group_name__by_chat_id")
        
    return group_name

def crud_get_group_teams_by_user_id(db: Session, user_id: int):
    """Retrieve multiple group teams by one participant_id ."""
    print("get_group_teams_by_user_id in group_crud.py:", user_id)
    
    team_names_db = db.query(models.Group.name, models.Group.group_id).join(models.UserGroup).filter(models.UserGroup.user_id == user_id).filter(models.Group.type == "team").all()
    # ! note you want the group name so will have to configure that 
    # chat_db = db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()
    # print("chat_db", chat_db)
    # print("group_id", chat_db.group_id)
    
    # group_db = crud_get_group_by_group_id(db=db, group_id=chat_db.group_id)
    
    # group_name = group_db.name
    # print("group_name in get_group_name__by_chat_id")
        
    return team_names_db

def crud_get_group_by_name_and_admin(db: Session, user_id: int, name: str):
    """Retrieves one group by admin and name."""
    group_db = db.query(models.Group).filter(models.Group.admin == user_id).filter(models.Group.name == name).first() 
    
    return group_db

def crud_get_user_group_by_user_id_group_id(db: Session, group_id: int, user_id: int):
    """Retrieve a specific user group by group id and user id."""
    print("group_id", group_id)
    
    return db.query(models.UserGroup).filter(models.UserGroup.group_id == group_id).filter(models.UserGroup.user_id == user_id).first()
    
def crud_delete_user_from_group(db: Session, user_group: DeleteUserGroup): 
    """Delete a specific user from a specific group."""
    print("user_group in crud_Deleete_user_from_group", user_group)

    db_user_id = crud_get_user_id_by_username(db, username=user_group.username)    
    
    db_team_invite = crud_delete_team_invite_by_recipient_id_group_id(db=db, team_id=user_group.group_id, recipient_id=db_user_id)
    
    db_user_group = crud_get_user_group_by_user_id_group_id(db, group_id=user_group.group_id, user_id=db_user_id)
        
    db.delete(db_user_group)
    db.commit()
    
    return db_user_group