from pydantic import BaseModel, Field


# * Pydantic Models / Schemas for Chat 

class Chat(BaseModel):
    """Pydantic class for chat."""
    chat_id: int = Field(default_factory=lambda: 0)
    # name: str
    group_id: int
    # participant_ids: list[int]
    # type: str
    # group_id: int
    
    class Config:
        from_attributes = True
        
class ChatObject(BaseModel): 
    """Pydantic class for chat object."""
    chat_id: int
    name: str
    
#     @field_validator('type')
#     def validate_us_states(cls, v):
#         group_list = [
#         'team', 'event', 'user'
#         ]

#         if v.upper() not in group_list:
#             raise ValueError("Invalid Group Code")
#         return v 