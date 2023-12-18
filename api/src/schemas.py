
from pydantic import BaseModel, EmailStr, field_validator, Field
from datetime import datetime, date, time
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
# !just added below will see if it works
# from . import models
import re

# ! THIS IS MY PYDANTIC MODEL

print("schemas.py is running")
    
# User Pydantic Models


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
    
    
# Event Pydantic Models



class EventBase(BaseModel):
    event_id: int = Field(default_factory=lambda: 0)
    type: str
    date: str
    address_id: int
    time: str
    time_zone: str
    theme: str
    description: str
    level: str
    co_ed: bool
    ruleset: str
    # jersey_colors: str
    # address: Address
    
    class Config:
        from_attributes = True
    
    @field_validator('level', mode="before")
    @classmethod
    def level_must_be_valid(cls, value):
        if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
            raise ValueError('Invalid level')
        return value
    
    @field_validator('ruleset', mode="before")
    @classmethod
    def ruleset_must_be_valid(cls, value):
        if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
            raise ValueError('Invalid ruleset')
        return value


class Address(BaseModel):
    address_id: int = Field(default_factory=lambda: 0)
    # name: Optional[str]
    # name: str
    street_address: str
    city: str
    state: str
    zip_code: str
    # events: EventBase
    
    @field_validator('state')
    @classmethod
    def validate_us_states(cls, value):
        states_list = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT','DE','FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]
        if value.upper() not in states_list:
            raise ValueError("Invalid State Code")
        return value
      
    
class Bout(EventBase):
    opposing_team: str
    team: str
    

class Mixer(EventBase):
    signup_link: str
    
    
# class Address(BaseModel):
#     address_id: Field(default_factory=lambda: 0)
#     name: Optional[int]
#     street_address: str
#     city: str
#     state: str
#     zip_code: str
    
#     @field_validator('state')
#     @classmethod
#     def validate_us_states(cls, value):
#         states_list = [
#         'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT','DE','FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
#         ]
#         if value.upper() not in states_list:
#             raise ValueError("Invalid State Code")
#         return value
    


# class EventAddress(BaseModel):
#     event_id: int
#     address_id: int
#     event: 
#     address: 
    

class BoutUpdate(EventBase):
    opposing_team: str
    team: str
     
class MixerUpdate(EventBase):
    signup_link: str
    
class EventDelete(BaseModel): 
    event_id: int 