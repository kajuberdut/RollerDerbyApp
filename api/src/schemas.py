
# ! test for sqlalchemy follow along

from pydantic import BaseModel, HttpUrl, EmailStr, field_validator
import uuid
from datetime import date, time
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
import re


print("schemas.py is running")


# schemas for api to validate the information..... 
# ! this is the transferred scehmas from main.py 


states_list = [
'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT','DE','FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

class Address(BaseModel):
    street_address: str
    city: str
    state: str
    zip_code: str
    
    # may need to type code this 
    @field_validator('state')
    def validate_us_states(cls, value):
    # def validate_us_states(cls, value: str) -> str:
        if value.upper() not in states_list:
            raise ValueError("Invalid State Code")
        return value
      
    @field_validator('zip_code')
    def validate_zip_codes(cls, value):
    # def validate_zip_codes(cls, value: str) -> str:
        regexp = r"^\d{5}(?:-\d{4})?$"
        match =  bool(re.match(regexp, value))
        if not match:
            raise ValueError("Invalid Zip Code")
        return value
    
class Location(BaseModel):
    city: str
    state_code: str
    
    @field_validator('state_code')
    def validate_us_states(cls, v):
        if v.upper() not in states_list:
            raise ValueError("Invalid State Code")
        return v   
    
class Rulesets(BaseModel): 
    rulesets_id: int 
    WFTDA: bool
    USARS: bool
    banked_track: bool
    short_track: bool
    
# class Insurance(BaseModel):
#     insurance_id: int
#     WFTDA = str
#     USARS = str
#     other = str 

class EventModel(BaseModel):
    event_id: uuid.UUID
    address: Address
    time: time
    date: date
    theme: str
    level: str
    jersey_colors: str
    ruleset: str
    co_ed: bool

    @field_validator('ruleset', mode="before")
    @classmethod
    def ruleset_must_be_valid(cls, value):
        if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
            raise ValueError('Invalid ruleset')
        return value
    
    # @validator('ruleset', pre=True)
    # def ruleset_must_be_valid(cls, value):
    #     if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
    #         raise ValueError('Invalid ruleset')
    #     return value
    
    @field_validator('level', mode="before")
    @classmethod
    def level_must_be_valid(cls, value):
        if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
            raise ValueError('Invalid level')
        return value
    
    # @validator('level', pre=True)
    # def level_must_be_valid(cls, value):
    #     if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
    #         raise ValueError('Invalid level')
    #     return value
    
    

class Bout(EventModel):
    opposing_team: str
    team: str
    

# Note this is the same as the class Bout so we are going to try and use that first. 
# class CreateBout(Bout):
#     event_id: uuid.UUID
#     address: Address
#     time: time
#     date: date
#     theme: str
#     level: str
#     jersey_colors: str
#     ruleset: str
#     co_ed: bool
#     opposing_team: str
#     team: str

class Mixer(EventModel):
    signup_link: HttpUrl
    

# Note this is the same as the class Mixer so we are going to try and use that first.
# class CreateMixer(Mixer):
#     event_id: uuid.UUID
#     address: Address
#     time: time
#     date: date
#     theme: str
#     level: str
#     jersey_colors: str
#     ruleset: str
#     co_ed: bool
#     opposing_team: str
#     team: str


# RulesetsType: TypeAlias  = Literal["WFTDA", "USARS", "Banked Track", "Flat Track"]

# what is needed for every user Mode l
class UserBase(BaseModel): 
    derby_name: str
    email: str

# class User(BaseModel):
#     user_id: uuid.UUID
#     derby_name: str
#     password: str
#     email: str
#     first_name: str
#     last_name: str
#     facebook_name: str
#     about: str
#     primary_number: int
#     secondary_number: int
#     level: str
#     # insurance: list[Insurance]
#     location: Location
#     associated_leagues: list[str]
#     played_rulesets: list[Rulesets]

class UpdateUser(UserBase):
    # user_id: uuid.UUID
    # derby_name: str
    # password: str
    # email: str
    first_name: str
    last_name: str
    facebook_name: str
    about: str
    primary_number: int
    secondary_number: int
    level: str
    # insurance: list[Insurance]
    location: Location
    associated_leagues: list[str]
    played_rulesets: list[Rulesets]
    

    
#     # ! note will have to come back to this as check_fields=False I think is wrong???? 
#     # ! have not found a substitute for each_item=True 
    @field_validator("played_rulsets", check_fields=False)
    def ruleset_must_be_valid(cls, ruleset: List[str]) -> List[str]:
        if ruleset not in rulesets:
            raise ValueError(f"Invalid ruleset: {ruleset}")
        return ruleset
    
    @field_validator('level')
    @classmethod
    def level_must_be_valid(cls, value: str) -> str:
        if value not in ['AA', 'A', 'B', 'C']:
            raise ValueError('Invalid level')
        return value

class UserCreate(UserBase):
    password: str

# class ItemBase(BaseModel):
#     title: str
#     description: str | None = None


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         from_attributes = True


# class UserBase(BaseModel):
#     email: str




# class User(UserBase):
#     id: int
#     is_active: bool
#     items: list[Item] = []

#     class Config:
#         from_attributes = True

# from pydantic import BaseModel


    
    
# class UserBase(BaseModel):
#     derby_name: str
#     email: EmailStr
    
#     class Config:
#         from_attributes = True

# class UserCreate(UserBase):
#     password: str
    
# class updateUser(UserBase): 
#     first_name: str
#     last_name: str
#     facebook_name: str
#     about: str
#     primary_number: int
#     secondary_number: int
#     level: str
#     insurance: list[Insurance]
#     location: str[Location]
#     played_rulesets: list[Rulesets]
#     associated_leagues: list[str]
    

# class EventsBase(BaseModel):
#     event_id: uuid.UUID
#     address: str[Address]
#     time: time
#     date: date
#     theme: str
#     level: str
#     jersey_colors: str
#     ruleset: str[Rulesets]
#     co_ed: bool
    
# class Bout(EventsBase):
#     opposing_team: str
#     team: str


    # note this shouold go on all classes so bouts/mixers etc when you get there
    # setting config value 
    # class Config:
    #     orm_mode = True
        