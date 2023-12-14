
from pydantic import BaseModel, HttpUrl, EmailStr, field_validator
from datetime import date, time
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
import re

# ! THIS IS MY PYDANTIC MODEL

print("schemas.py is running")
    

class EventBase(BaseModel):
    time: time
    date: date
    theme: str
    level: str
    jersey_colors: str
    co_ed: bool
    
    @field_validator('level', mode="before")
    @classmethod
    def level_must_be_valid(cls, value):
        if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
            raise ValueError('Invalid level')
        return value
    
    

class Bout(EventBase):
    opposing_team: str
    team: str
    

class Mixer(EventBase):
    signup_link: HttpUrl
    

class UserBase(BaseModel): 
    # user_id: Optional[int]
    derby_name: str
    email: str

    
# class UserCreate(UserBase):
#     password: str

class UserCreate(BaseModel): 
    user_id: Optional[int]
    derby_name: str
    email: str
    password: str
