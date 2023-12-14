
from pydantic import BaseModel, EmailStr, field_validator, Field
from datetime import datetime, date, time
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
import re

# ! THIS IS MY PYDANTIC MODEL

print("schemas.py is running")
    

class EventBase(BaseModel):
    event_id: int = Field(default_factory=lambda: 0)
    type: str
    # time: datetime.time
    # date: date
    date: str
    time: str
    theme: str
    level: str
    co_ed: bool
    # jersey_colors: str
    
    class Config:
        from_attributes = True
    
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
    signup_link: str
    

class UserBase(BaseModel): 
    user_id: int = Field(default_factory=lambda: 0)
    derby_name: str
    email: str     
    
class UserCreate(UserBase):
    password: str
    
class UserDelete(BaseModel): 
    user_id: int 
    password: str
    
class UserUpdate(BaseModel): 
    derby_name: str
    email: str 
# * note with this you dont have to have the user_id in the object but you could change this. 

class UserDelete(BaseModel):
    user_id: int
    password: str

class BoutUpdate(EventBase):
    opposing_team: str
    team: str
     
class MixerUpdate(EventBase):
    signup_link: str
    
class EventDelete(BaseModel): 
    event_id: int 