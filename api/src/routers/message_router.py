from fastapi import APIRouter, Depends
from ..dependencies import get_and_validate_current_user, get_db

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *

router = APIRouter(
    prefix="/messages",
    tags=["messages"],
      dependencies=[Depends(get_and_validate_current_user)],
)


# * get /messages/{participant_ids}
# * gets messages of chat 

@router.get("/{participant_ids}")
def get_messages(participant_ids: str, db: Session = Depends(get_db)):
    print("hitting /messages/{participant_ids} in messsages_router.py")
    
    participant_ids_list = sorted( participant_ids.split(","))
    
    db_group = crud_get_group_id_by_participants(db, participant_ids=participant_ids_list)
    if not db_group: 
        return []
    
    db_chat = crud_get_chat_by_group_id(db, group_id=db_group.group_id)
    
    db_messages = crud_get_messages_by_chat_id(db, chat_id=db_chat.chat_id)

    
    print("db messages in /messages/{participants_ids}:", db_messages)

    return db_messages


# * get /messages 
# * gets all messages 
# * testing only 

# @router.get("/", response_model=list[Message])
# def get_messages(limit: int = 100, db: Session = Depends(get_db)):
#     print("hitting /messages in main.py")
#     return get_messages(db=db)

# * get /messages/users
# * gets all messages and users
# * testing only 

# @router.get("/users", response_model=list[Message])
# def get_messages_with_users(limit: int = 100, db: Session = Depends(get_db)):
#     data = crud_get_messages_with_user_ids(db, limit=limit)

#     return data
