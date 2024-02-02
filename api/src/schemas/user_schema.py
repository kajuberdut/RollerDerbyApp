from pydantic import BaseModel, field_validator, Field
from typing import Optional

from .ruleset_schema import *
from .position_schema import *
from .insurance_schema import *
from .message_schema import *

import re

# * Pydantic Models / Schemas for User

class UserBase(BaseModel): 
    """Pydantic class for user."""
    user_id: int = Field(default_factory=lambda: 0)
    username: str
    email: str

class UserList(BaseModel): 
    """Pydantic class for users list."""
    user_id: int = Field(default_factory=lambda: 0)
    username: str
    image: Optional[bytes] = None
    
class UserCreate(UserBase):
    """Pydantic class for create user."""
    password: str
    
class UserDelete(BaseModel): 
    """Pydantic class for delete user."""
    user_id: int 
    password: str
    
class UserUpdate(UserBase):
    """Pydantic class for update user."""
    image: bytes
    phone_number: str
    first_name: str
    last_name: str
    facebook_name: str
    additional_info: str
    about: str
    primary_number: int
    secondary_number: int
    level: str
    ruleset: Ruleset = None
    position: Position = None
    insurance: Insurance = None
    message: Message = None
    location_id: int
    associated_leagues: str
    # ruleset_id: int
    # position_id: int
    
    @field_validator('phone_number', mode="before")
    @classmethod
    def phone_number_must_be_valid(cls, value):
        phone_regex = r"^\d{10}$"  
        if not re.match(phone_regex, value):
            raise ValueError("Invalid phone number format. Please enter a 10-digit number")
        return value
    
class UserUpdateProfile(BaseModel):
    """Pydantic class for update profile user (public details)."""
    username: Optional[str] = None
    image: Optional[bytes] = None
    facebook_name: Optional[str] = None
    about: Optional[str] = None
    primary_number: Optional[int] = None
    level: Optional[str] = None
    ruleset: Optional[Ruleset] = None
    position: Optional[Position] = None
    location_id: Optional[int] = None
    associated_leagues: Optional[str] = None
    # ruleset_id: int
    # position_id: int
    
class UserUpdatePrivateDetails(BaseModel):
    email: Optional[str] = None
    phone_number: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    additional_info: Optional[str] = None
    secondary_number: Optional[int] = None
    # insurance: Optional[Insurance] = None
    
    @field_validator('phone_number', mode="before")
    @classmethod
    def phone_number_must_be_valid(cls, value):
        phone_regex = r"^\d{10}$"  
        if not re.match(phone_regex, value):
            raise ValueError("Invalid phone number format. Please enter a 10-digit number")
        return value
    
class UserImage(BaseModel): 
    image: Optional[bytes] = None
    
class UserDetailsPublic(UserBase): 
    """Pydantic class for user details public that inherits from user base."""
    # image: Optional[bytes] = None
    # cant store image on local storage it is too large
    facebook_name: Optional[str] = None 
    about: Optional[str] = None 
    primary_number: Optional[int] = None
    level: Optional[str] = None 
    ruleset: Optional[list[UserRuleset]] = None
    position: Optional[list[UserPosition]] = None
    insurance: Optional[list[UserInsurance]] = None
    location_id: Optional[int] = None
    associated_leagues: Optional[str] = None
    
    @field_validator('level', mode="before")
    @classmethod
    def level_must_be_valid(cls, value):
        if value not in ['AA', 'A', 'B', 'C', None, '']:
            raise ValueError('Invalid level')
        return value
    
class UserDetailsPrivate(UserDetailsPublic): 
    """Pydantic class for user details private that inherits from user details public."""
    phone_number: Optional[str] = None
    first_name: Optional[str] = None 
    last_name: Optional[str] = None 
    additional_info: Optional[str] = None
    secondary_number: Optional[int] = None
    
class UserDelete(BaseModel):
    """Pydantic class for delete user."""
    user_id: int
    password: str
    
class UserDetailsTeam(BaseModel):
    email: str
    phone_number: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    facebook_name: Optional[str] = None
    additional_info:Optional[str] = None
    primary_number: Optional[int] = None
    secondary_number: Optional[int] = None
    level: Optional[str] = None
    ruleset: Optional[list[UserRuleset]] = None
    position: Optional[list[UserPosition]] = None
    insurance: Optional[list[UserInsurance]] = None

    