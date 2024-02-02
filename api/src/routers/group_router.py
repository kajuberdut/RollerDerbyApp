from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *

router = APIRouter()

# * post /groups
# * adds user to a group

@router.post("/groups/", response_model=UserGroup)
def add_user_to_group(token: Annotated[str, Depends(oauth2_scheme)], user_group: UserGroup, db: Session = Depends(get_db)):
    print("user_group in groups in group_router.py :", user_group)
    formatted_user_group = {
                            "user_id": user_group.user_id,
                            "group_id": user_group.group_id
                        }
    # * note: you could remove this formatting but if you do that you have to also do it in chats.
    
    user_group = crud_add_user_to_group(db=db, user_group=formatted_user_group)
    
    return user_group 

# ! the return should not be CreateGroup I think it should be Group
@router.post("/groups/teams", response_model=Group)
def create_team(token: Annotated[str, Depends(oauth2_scheme)], group: Group, db: Session = Depends(get_db)):
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

    # ? do you need to return the chat_id with the team is the question? 
    # team.chat_id = chat.chat_id
    # * note: you could remove this formatting but if you do that you have to also do it in chats.
    
    # todo add user to team and chat
 
    
    formatted_user_group = {
        "group_id": group_id,
        "user_id": team.admin
    }
    
    user_group = crud_add_user_to_group(db=db, user_group=formatted_user_group)
    
    print("*********************************************")
    print("user_group", user_group) 
    print("*********************************************")
    
    
    return team

# * get /group/name/{chat_id}
# * get group name by chat_id

@router.get("/group/name/{chat_id}")
def get_group_name_by_chat_id(token: Annotated[str, Depends(oauth2_scheme)], chat_id: int, db: Session = Depends(get_db)):
        
    db_group_name = crud_get_group_name_by_chat_id(db=db, chat_id=chat_id)

    return db_group_name

# * get /groups/teams/{user_id}
# * get group teams name by user_id

@router.get("/groups/teams/{user_id}")
def get_teams_by_user_id(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db)):
        
    teams = crud_get_group_teams_by_user_id(db=db, user_id=user_id)

    return teams

# * get /groups/{group_id}
# * get group team name by group_id

@router.get("/groups/{group_id}")
def get_group_by_group_id(token: Annotated[str, Depends(oauth2_scheme)], group_id: int, db: Session = Depends(get_db)):
    print("hitting /groups/group_id")
 
    groupDets = crud_get_group_by_group_id(db=db, group_id=group_id)
    
    participant_names = crud_get_participant_usernames_by_group_id(db=db, group_id=group_id)
    
    # todo information we want back from this route
    # admin will use this to display correct information if the user is an admin we need partiicpants as well 
    # this will be user_group information
    
    group = {
        "group_id": group_id,
        "name": groupDets.name,
        "admin": groupDets.admin,
        "participants": participant_names,
    }
    
    print("**********************************************")
    print("group", group)
    print("**********************************************")
    
    return group

# * delete /groups
# * deletes user from a group

@router.delete("/groups/", response_model=UserGroup)
def delete_user_from_group(token: Annotated[str, Depends(oauth2_scheme)], user_group: DeleteUserGroup, db: Session = Depends(get_db)):
    print("delete_user_group in groups in group_router.py :", user_group)
    # formatted_user_group = {
    #                         "username": user_group.username,
    #                         "group_id": user_group.group_id
    #                     }
    
    user_group = crud_delete_user_from_group(db=db, user_group=user_group)
    
    return user_group 