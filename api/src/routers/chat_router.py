from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db


from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
    dependencies=[Depends(oauth2_scheme)],
)

# * get /chats/{user_id}
# * gets all chats by user_id 

@router.get("/{user_id}", response_model=list[ChatObject])
def get_chats(user_id: int, db: Session = Depends(get_db)):
    print("hitting /chats in main.py")
    
    groups_db = crud_get_groups_by_participant(db=db, user_id=user_id)
    print("groups db in main.py:", groups_db)
    # for group_id in groups_db.group_id
    group_ids = [group.group_id for group in groups_db]
    print("group_ids in main.py:", group_ids)
    
    chats_db = crud_get_chats_by_group_ids(db=db, group_ids=group_ids)

    return chats_db

# * get /chats/{chat_id}/participants/usernames
# * gets participant usernames of one chat by chat_id 

@router.get("/{chat_id}/participants/usernames", response_model=list[str])
def get_chat_participant_usernames(chat_id: int, db: Session = Depends(get_db)):
    print("hitting /chat/chat_id in main.py")

    #! may want to return group name instead later..... 
     # todo NOTE YOU EDITED THIS IF THERE IS AN ERROR WITH WEB SOCKET CHAT START HERE  

    group_id = crud_get_group_id_by_chat_id(db=db, chat_id=chat_id)
    
    participant_usernames = crud_get_participant_usernames_by_group_id(db=db, group_id=group_id)
    print("participants in mian.py", participant_usernames)

    return participant_usernames

# * get /chats/{chat_id}/participants/ids
# * gets participant ids of chat by chat_id 

@router.get("/{chat_id}/participants/ids", response_model=list[int])
def get_chat_participant_ids(chat_id: int, db: Session = Depends(get_db)):
    print("hitting /chat/chat_id in main.py")

    #! may want to return group name instead later.....  

    group_id = crud_get_group_id_by_chat_id(db=db, chat_id=chat_id)
    
    participant_ids = crud_get_participant_ids_by_group_id(db=db, group_id=group_id)
    print("participants in mian.py", participant_ids)

    return participant_ids

# * get /chats/{chat_id}/history
# * gets history by chat_id

@router.get("/{chat_id}/history")
def get_messages_by_chat_id(chat_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
        
    db_messages = crud_get_messages_by_chat_id(db, chat_id=chat_id)

    return db_messages

