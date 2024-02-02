from pydantic import BaseModel, Field, field_validator
from typing import Union, Optional

# * Pydantic Models / Schemas for Group

class UserGroup(BaseModel):
    """Pydantic class for users groups."""
    user_id: int
    group_id: int

    class ConfigDict:
        from_attributes = True 
        
class DeleteUserGroup(BaseModel):
    """Pydantic class for deleting a user group."""
    username: str
    group_id: int

    class ConfigDict:
        from_attributes = True 
    
class Group(BaseModel): 
    """Pydantic class for group."""
    group_id: int = Field(default_factory=lambda: 0)
    # name: str
    name: Union[str, list[str]]
    type: str
    admin: Optional[int] = None
    
    @field_validator('type')
    def validate_insurance(cls, v):
        type_list = [
        'team', 'users', 'event', ''
        ]
        if v not in type_list:
            raise ValueError("Invalid type of group")
        return v  
    
    # class Config:
    #     from_attributes = True 
    
class CreateGroup(BaseModel): 
    """Pydantic class for create group."""
    name: str
    participant_ids: list[int]
    
    # class Config:
    #     from_attributes = True 
    
# class CreateTeam(BaseModel): 
#     group_id: int = Field(default_factory=lambda: 0)
#     name: str
    