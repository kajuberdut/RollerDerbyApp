from pydantic import BaseModel, Field

# * Pydantic Models / Schemas for Message

class Message(BaseModel): 
    """Pydantic class for message."""
    message_id: int = Field(default_factory=lambda: 0)
    chat_id: int
    message: str
    date_time: str
    sender_id: int
    sender_username: str
    # ! add sender_username to message as well then you can easily identify 
    
    # class Config:
    #     from_attributes = True
    
class MessageDelete(BaseModel): 
    """Pydantic class for message delete."""
    message_id: int
    
class MessageObject(BaseModel): 
    """Pydantic class for message object."""
    message_id: int
    sender_id: int
    sender_username: str
    participant_ids: list[int]
    message: str
    date_time: str
    
    @property
    def user_id(self):
        return self.sender_id