from fastapi import APIRouter, Depends
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

# * get /group/name/{chat_id}
# * get group name by chat_id

@router.get("/group/name/{chat_id}")
def get_group_name_by_chat_id(token: Annotated[str, Depends(oauth2_scheme)], chat_id: int, db: Session = Depends(get_db)):
        
    db_group_name = crud_get_group_name_by_chat_id(db=db, chat_id=chat_id)

    return db_group_name
