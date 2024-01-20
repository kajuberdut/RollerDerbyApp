from sqlalchemy.orm import Session, joinedload
from .. import models
from ..schemas.message_schema import * 

# * Create, Read, Update, Delete Messages in Database 


def crud_create_message(db: Session, message: Message):
    """Create new message."""
    print("!!!!! message in create_message CRUD", message)  
    print("message['sender_username']", message["sender_username"])
    
    db_message = models.Message(chat_id=message["chat_id"], message=message['message'], date_time=message['date_time'], sender_id=message["sender_id"], sender_username=message["sender_username"])
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return db_message.message_id

def crud_create_user_message(db: Session, sender_id: int, sender_username: str, message_id: int, participant_ids: list[int]): 
    """Create new user message."""
    db_user_message = models.UserMessage(sender_id=sender_id, sender_username=sender_username, message_id=message_id, participant_ids=participant_ids)
    db.add(db_user_message)
    db.commit()
    db.refresh(db_user_message)
    
    return db_user_message

def crud_get_message_by_id(db: Session, message_id: int): 
    """Retrieve message by message_id."""
    return db.query(models.Message).filter(models.Message.message_id == message_id).first()

def crud_get_messages(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all messages."""
    print("hitting crud get messages")
    return db.query(models.Message).offset(skip).limit(limit).all()

def crud_get_user_message(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all users messages."""
    print("hitting crud get user messages")
    return db.query(models.UserMessage).offset(skip).limit(limit).all()

def crud_get_messages_by_chat_id(db: Session, chat_id: int):
    """Retrieve all messages by chat_id."""
    print("hitting get_messages_by_chat_id in CRUD.py")

    messages = db.query(models.Message).filter(models.Message.chat_id == chat_id).all()
    
    print("messages in messages_CRUD  &&&&&&&&&&", messages)

    message_objects = []
    
    for message in messages:
        
        message_object = {
            "message_id": message.message_id,
            "chat_id": message.chat_id,
            "user_id": message.sender_id,
            "sender_username": message.sender_username,
            "message": message.message,
            "date_time": message.date_time
        }
        message_objects.append(message_object)
    
    print(" ^^^^^^^^^^^^^^^ message_objects", message_objects)
    return message_objects

def crud_get_messages_with_user_ids(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all users messages."""
    print("Fetching messages with user IDs...")
  
    messages = (
        db.query(models.Message)
        .options(joinedload(models.Message.user))  # Eagerly load users
        .offset(skip)
        .limit(limit)
        .all()
    )

    return messages

def crud_delete_message(db: Session, message_id: int):
    """Delete message by message_id."""
    db_message = crud_get_message_by_id(db, message_id)      
        
    db.delete(db_message)
    db.commit()
    
    return db_message

# def crud_get_messages(db: Session, skip: int = 0, limit: int = 100):
#     print("hitting crud get messages")
#     return db.query(models.Message).offset(skip).limit(limit).all()

# def crud_get_user_message(db: Session, skip: int = 0, limit: int = 100):
#     print("hitting crud get user messages")
#     return db.query(models.UserMessage).offset(skip).limit(limit).all()

# # def get_chat_history(db: Session, user_id: int, participant_ids: List[int]) -> List[dict]:
# def crud_get_chat_history(db: Session):
#     """Retrieves chat history between a user and specified partipantss."""
#     print("hitting get_chat_history in CRUD.py")
#     messages = (
#         db.query(models.Message, models.User, models.UserMessage.participant_ids)
#         .join(models.UserMessage, models.UserMessage.message_id == models.Message.message_id)  # Join with UserMessage
#         .join(models.User, models.User.user_id == models.UserMessage.sender_id)  # Join with User
#         # .filter(Message.sender_id == 3)  # Filter by sender ID
#         # .filter(User.id())  # Filter by partipants IDs
#         .order_by(models.Message.date_time.asc())
#         .all()
#     )

#     message_objects = []
    
#     for message, sender, participant_ids in messages:
        
#         message_object = {
#             "message_id": message.message_id,
#             "sender_id": sender.user_id,
#             "participant_ids": participant_ids,
#             "message": message.message,
#             "date_time": message.date_time
#         }
#         message_objects.append(message_object)
    
#     return message_objects

# def crud_get_messages_with_user_ids(db: Session, skip: int = 0, limit: int = 100):
#     print("Fetching messages with user IDs...")
  
#     messages = (
#         db.query(models.Message)
#         .options(joinedload(models.Message.user))  # Eagerly load users
#         .offset(skip)
#         .limit(limit)
#         .all()
#     )

#     return messages

# # def crud_create_message(db: Session, message_id: int, message: str, date_time: str):

# def crud_create_message(db: Session, message: Message):
#     print("message in create_message CRUD", message)

#     db_message = models.Message(message=message['message'], date_time=message['date_time'], chat_id=message['chat_id'])

#     db.add(db_message)
#     db.commit()
#     db.refresh(db_message)
    
#     return db_message.message_id

# def crud_create_user_message(db: Session, sender_id: int, message_id: int): 
#     db_user_message = models.UserMessage(sender_id=sender_id, message_id=message_id)
#     db.add(db_user_message)
#     db.commit()
#     db.refresh(db_user_message)
#     return db_user_message

# def crud_get_message_by_id(db: Session, message_id: int): 
#     return db.query(models.Message).filter(models.Message.message_id == message_id).first()

# def crud_delete_message(db: Session, message_id: int):
#     db_message = get_message_by_id(db, message_id)      
        
#     db.delete(db_message)
#     db.commit()
    
#     return db_message
