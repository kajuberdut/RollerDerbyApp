from sqlalchemy.orm import Session 
from .. import models
from ..schemas.chat_schema import * 

# * Create, Read, Update, Delete Chat in Database 

def crud_create_chat(db: Session, chat: Chat):
    """Create new chat."""
    
    db_chat = models.Chat(group_id=chat['group_id'])
    
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    
    return db_chat

def crud_get_chat_by_group_id(db: Session, group_id: int):
    """Retrieve a specific chat by group_id."""
    print("crud_get_chat_by_id in chat_crud.py:", group_id)
    
    
    return db.query(models.Chat).filter(models.Chat.group_id == group_id).first()

def crud_get_chats_by_group_ids(db: Session, group_ids: list[int]):
    """Retrieve multiple chats by multiple group_ids."""
    print("crud_get_chats_by_group_ids in chat_crud.py:", group_ids)
    
    chats = db.query(models.Chat, models.Group.name) \
          .join(models.Group, models.Chat.group_id == models.Group.group_id) \
          .filter(models.Chat.group_id.in_(group_ids)) \
          .all()
     
    chat_objects = []
    
    for chat in chats:
        chat_object = {
            "chat_id": chat[0].chat_id,
            "name": chat[1],
        }

        chat_objects.append(chat_object)
    
    return chat_objects
  

def crud_get_chats_by_user_id(db: Session, user_id: int):
    """Retrieve a multiple chats by user_id."""
    print("crud_get_chats_by_user_id in chat_crud.py:", user_id)
    
    chats = db.query(models.Chat).filter(models.Chat.participant_ids.any(user_id)).all()

    return chats



# def crud_get_chat_by_id(db: Session, chat_id: int):
#     print("!!!!! get_chat_by_id in crud.py !!!!!!:", chat_id)
    
#     return db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()

# def crud_get_chat_id_by_participants(db: Session, participant_ids: list[int]):
#     print("!!!!! get_chat_by_participant_id in crud.py !!!!!!:", participant_ids)
    
#     chat_db = db.query(models.Chat).filter(models.Chat.participant_ids == participant_ids).first()
    
#     print("!!!!!!!!!!!! chat_db", chat_db)

#     return chat_db