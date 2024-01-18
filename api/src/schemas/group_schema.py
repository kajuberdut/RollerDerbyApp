from pydantic import BaseModel, Field

# * Pydantic Models / Schemas for Group

class UserGroup(BaseModel):
    """Pydantic class for users groups."""
    user_id: int
    group_id: int

    class ConfigDict:
        from_attributes = True 
    
class Group(BaseModel): 
    """Pydantic class for group."""
    group_id: int = Field(default_factory=lambda: 0)
    name: str
    
    # class Config:
    #     from_attributes = True 
    
class CreateGroup(BaseModel): 
    """Pydantic class for create group."""
    name: str
    participant_ids: list[int]
    
    # class Config:
    #     from_attributes = True 