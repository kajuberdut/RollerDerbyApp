from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import get_and_validate_current_user, get_db

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *

router = APIRouter(
    prefix="/groups",
    tags=["groups"],
    dependencies=[Depends(get_and_validate_current_user)]
)

# * post /groups
# * adds user to a group

@router.post("/", response_model=UserGroup)
def add_user_to_group(user_group: UserGroup, db: Session = Depends(get_db)):
    print("user_group in groups in group_router.py :", user_group)
    formatted_user_group = {
                            "user_id": user_group.user_id,
                            "group_id": user_group.group_id
                        }
    # * note: you could remove this formatting but if you do that you have to also do it in chats.
    
    user_group = crud_add_user_to_group(db=db, user_group=formatted_user_group)
    
    return user_group 

# * post /groups/teams
# * create new team

@router.post("/teams", response_model=Group)
def create_team(group: Group, db: Session = Depends(get_db)):
    print(" in groups in group_router.py :", group)
    
    existing_team = crud_get_group_by_name_and_admin(db=db, user_id=group.admin, name=group.name)
    
    if existing_team: 
        raise HTTPException(status_code=409, detail=f"Team already exists with the same admin and name.")
    
    group = {
        "participant_ids": [group.admin],
        "name": group.name,
        "admin": group.admin,
        "type": group.type
    }
    
    team = crud_create_team(db=db, group=group)
    print("Team in group_router ", team)
    print("team.type", team.type)
    print("team.admin", team.admin)
    # ? not sure abotu this line
    
    group_id = team.group_id
    print("group_id", group_id)
    
    # create chat for team
    chat = {
        "group_id": group_id
        }
    chat = crud_create_chat(db=db, chat=chat) 
    
    formatted_user_group = {
        "group_id": group_id,
        "user_id": team.admin
    }
    
    user_group = crud_add_user_to_group(db=db, user_group=formatted_user_group)
    
    return team

# * get /groups/group/name/{chat_id}
# * get group name by chat_id

@router.get("/group/name/{chat_id}")
def get_group_name_by_chat_id(chat_id: int, db: Session = Depends(get_db)):
        
    db_group_name = crud_get_group_name_by_chat_id(db=db, chat_id=chat_id)

    return db_group_name

# * get /groups/teams/{user_id}
# * get group teams name by user_id

@router.get("/teams/{user_id}")
def get_teams_by_user_id(user_id: int, db: Session = Depends(get_db)):
        
    teams = crud_get_group_teams_by_user_id(db=db, user_id=user_id)

    return teams

# * get /groups/{group_id}
# * get group team name by group_id

@router.get("/{group_id}")
def get_group_by_group_id(group_id: int, db: Session = Depends(get_db)):
    print("hitting /groups/group_id")
 
    groupDets = crud_get_group_by_group_id(db=db, group_id=group_id)
    
    participant_names = crud_get_participant_usernames_by_group_id(db=db, group_id=group_id)
    
    group = {
        "group_id": group_id,
        "name": groupDets.name,
        "admin": groupDets.admin,
        "participants": participant_names,
    }
    
    return group

# * delete /groups
# * deletes user from a group

@router.delete("/", response_model=UserGroup)
def delete_user_from_group(user_group: DeleteUserGroup, db: Session = Depends(get_db)):
    print("delete_user_group in groups in group_router.py :", user_group)
    
    user_group = crud_delete_user_from_group(db=db, user_group=user_group)
    
    return user_group 