from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *

router = APIRouter()

# * get /messages/users
# * gets all messages and users

@router.get("/messages/users", response_model=list[Message])
def get_messages_with_users(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    data = crud_get_messages_with_user_ids(db, skip=skip, limit=limit)

    return data


# * get /history
# * gets chat history

@router.get("/history/{participant_ids}")
def get_messages(token: Annotated[str, Depends(oauth2_scheme)], participant_ids: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /history in messsages_router.py")
    
    participant_ids_list = sorted( participant_ids.split(","))
    
    db_group = crud_get_group_id_by_participants(db, participant_ids=participant_ids_list)
    
    db_chat = crud_get_chat_by_group_id(db, group_id=db_group.group_id)
    
    db_messages = crud_get_messages_by_chat_id(db, chat_id=db_chat.chat_id)
    
    print("db messages in /history/{participants_ids}:", db_messages)

    return db_messages

# * get /messages 
# * gets all messages 

@router.get("/messages", response_model=list[Message])
def get_messages(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /messages in main.py")
    return get_messages(db, skip=skip, limit=limit)