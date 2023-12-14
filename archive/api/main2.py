# from enum import Enum 
# from . import crud, models, schemas
# from .database import SessionLocal, engine
# import re

# * everything below is for middleware from patrick
# import json
# import typing

# from starlette.middleware.base import BaseHTTPMiddleware
# from starlette.requests import Request
# from starlette.responses import Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from incase import Case, Caseless

# RequestResponseEndpoint = typing.Callable[[Request], typing.Awaitable[Response]]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# class MaybeJsonAsyncIterator:
#     """This is used to wrap the iterable body of the streaming response
#     so that the json keys can be handled when the iterable is called.
#     """

#     def __init__(self):
#         self._iterable = []
#         self.length = 0

#     async def ingest_body_iterable(self, base_iterable):
#         async for part in base_iterable:
#             try:
#                 json_content = json.loads(part)
#                 new_part = json.dumps(
#                     {
#                         Caseless(key)[Case.CAMEL]: value
#                         for key, value in json_content.items()
#                     }
#                 ).encode(encoding="utf-8")
#                 self.length += len(new_part)
#                 self._iterable.append(new_part)
#             except json.JSONDecodeError:
#                 self.length += len(part)
#                 self._iterable.append(part)

#     def __aiter__(self):
#         return self

#     async def __anext__(self):
#         for item in self._iterable:
#             return item
#         raise StopAsyncIteration


# class JSONCaseTranslatorMiddleware(BaseHTTPMiddleware):
#     """This middleware translates the case of json keys recieved and sent by the
#     asgi app. It is helpful for allowing a python back-end to use snake_case
#     while allowing a javascript front end to use camelCase."""

#     async def dispatch(self, request: Request, call_next: RequestResponseEndpoint):
#         try:
#             data = await request.body()
#             request._body = json.dumps(
#                 {
#                     Caseless(key)[Case.SNAKE]: value
#                     for key, value in json.loads(data).items()
#                 }
#             ).encode(encoding="utf-8")
#             request.content_length = len(request._body)
#         except json.JSONDecodeError:
#             pass  # guess it wasn't json
#         response = await call_next(request)
#         if response.headers.get("content-type") == "application/json":
#             new_body = MaybeJsonAsyncIterator()
#             await new_body.ingest_body_iterable(response.body_iterator)
#             response.body_iterator = new_body
#         return response
    
    
# *Everything above is for middle from patrick


# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# pulling all routes from my main.py file to build on the api routes
# do all the basics get, put, patch, delete etc. 

# !  going to change this to patch to see if that makes a difference
@api_app.patch("/users/{derby_name}", response_model=schemas.UserBase)
def update_user(derby_name: str, update_data: schemas.UserBase, db: Session = Depends(get_db)): 
    print("you are hitting the put users/derby_name/ route in main.py")
    user = crud.get_user_by_derby_name(db, derby_name)
    print("user in update_user put route in main.py!!!", user)

    if not user:
        raise HTTPException(status_code=404, detail=f"User with {derby_name} not found")

    updated_user = crud.update_user(db, user, update_data)

    return {"updated": {"user": updated_user} }   
    

# # * this will return all events for /events/ but will also return if searching by any of the below date, theme, level, ruleset, co_ed
# # * http://127.0.0.1:8000/events/?level=A

@api_app.get("/events/", response_model=list[schemas.EventModel])
def query_event_by_parameters(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    date: Optional[date] = None,
    theme: Optional[str] = None,
    level: Optional[str] = None,
    ruleset: Optional[str] = None,
    co_ed: Optional[bool] = None,
    
    events = crud.get_events(db, limit=100)

    def check_event(event: events) -> bool:
        return all(
            (
            date is None or event.date == date, 
            theme is None or event.theme == theme, 
            level is None or event.level == level, 
            ruleset is None or event.ruleset == ruleset, 
            co_ed is None or event.co_ed == co_ed
            )
        )

    selection = [event for event in events.values() if check_event(event)]
    # Return the filtered events
    if not selection:
        raise HTTPException(status_code=404, detail="No events found")

    return {
        "query": {"date": date, "theme": theme, "level": level, "ruleset": ruleset, "selection": selection, 
        }
    }

# * this is search by event_id 

@api_app.get("/events/{event_id}", response_model=schemas.EventModel)
def query_bout(event_id: int, db: Session = Depends(get_db)):
    db_event = crud.get_event(db, event_id=event_id)
# def query_bout(event_id:uuid.UUID) -> Bout:
    if db_event is None:
        raise HTTPException(
            status_code=404, detail=f"event with {event_id} does not exist"
        )

    return db_event 

# send json to end point and then it will automatically return json data

@api_app.post("/events/bouts", response_model=schemas.Bout) 
def add_bout(bout: schemas.Bout, db: Session = Depends(get_db)): 
    
    bout = crud.create_bout(db, bout_id=bout.bout_id)
    # if bout.event_id in events:
    #     HTTPException(status_code=400, detail=f"Bout with {bout.event_id} already exists")    
    if bout:
        raise HTTPException(status_code=400, detail="Bout already entered")
    # events[bout.event_id] = bout
    return {"added": bout}
    # also checkout what this return does 
    # return crud.create_bout(db=db, bout=bout)

@api_app.post("/events/mixers") 
def add_mixer(mixer: schemas.Mixer, db: Session = Depends(get_db)):
# def add_mixer(mixer: Mixer) -> dict[str, Mixer]: 

    mixer = crud.create_mixer(db, event_id=event.event_id)
    if mixer: 
        raise HTTPException(status_code=400, detail="Email already registered")
    # if mixer.event_id in events:
    #     HTTPException(status_code=400, detail=f"Mixer with {mixer.event_id} already exists")    
    
    # events[mixer.event_id] = mixer
    return {"added": mixer}
    # return crud.create_mixer(db=db, mixer=mixer)

Selection = dict[str, Union[str, int, float, uuid.UUID, List[str], Optional[Any]]]


@api_app.put("/events/bouts/{event_id}")
def updateBout(
    event_id: uuid.UUID, 
    address: Optional[str] = None,
    time: Optional[time] = None, 
    date: Optional[date] = None, 
    theme: Optional[str] = None, 
    level: Optional[str] = None, 
    jersey_colors: Optional[str] = None, 
    ruleset: Optional[str] = None,
    co_ed: Optional[bool] = None, 
    opposing_team: Optional[str] = None,
    team: Optional[str] = None,
    ) -> dict[str, Selection]:


    if event_id not in events: 
        HTTPException(status_code=404, detail=f"Event with {event_id} not found")
    if all(info is None for  info in (address, time, date, theme, level, jersey_colors, co_ed, ruleset, opposing_team, team)):
        raise HTTPException(status_code=400, detail="No parameters provided for update.")
    
    event = events[event_id]
    if address is not None: 
        event.address = address
    if time is not None: 
        event.time = time
    if date is not None: 
        event.date = date
    if theme is not None: 
        event.theme = theme
    if level is not None: 
        event.level = level
    if jersey_colors is not None: 
        event.jersey_colors = jersey_colors
    if ruleset is not None: 
        event.ruleset = ruleset
    if co_ed is not None: 
        event.co_ed = co_ed
    if opposing_team is not None: 
        event.opposing_team = opposing_team
    if team is not None: 
        event.team = team
 
        
    
    return {"updated": {"bout": event} }   


@api_app.put("/events/mixers/{event_id}")
def updateMixer(
    event_id: uuid.UUID, 
    address: Optional[str] = None,
    time: Optional[time] = None, 
    date: Optional[date] = None, 
    theme: Optional[str] = None, 
    level: Optional[str] = None, 
    jersey_colors: Optional[str] = None, 
    ruleset: Optional[str] = None,
    co_ed: Optional[bool] = None, 
    signup_link: Optional[HttpUrl] = None,
    ) -> dict[str, Selection]:


    if event_id not in events: 
        HTTPException(status_code=404, detail=f"Event with {event_id} not found")
    if all(info is None for  info in (address, time, date, theme, level, jersey_colors, ruleset, co_ed, signup_link)):
        raise HTTPException(status_code=400, detail="No parameters provided for update.")
    
    event = events[event_id]
    if address is not None: 
        event.address = address
    if time is not None: 
        event.time = time
    if date is not None: 
        event.date = date
    if theme is not None: 
        event.theme = theme
    if level is not None: 
        event.level = level
    if jersey_colors is not None: 
        event.jersey_colors = jersey_colors
    if ruleset is not None: 
        event.ruleset = ruleset
    if co_ed is not None: 
        event.co_ed = co_ed
    if signup_link is not None: 
        event.signup_link = signup_link
 
        
    
    return {"updated": {"mixer": event} }   





# #  **** User routes *** 

# *note here you may need to change the level because you have level as a string

# @api_app.get("/users/", response_model=list[schemas.UserBase])
# def query_user_by_parameters(
#     derby_name: str = None, 
#     email: str = None, 
#     first_name: Optional[str] = None, 
#     last_name: Optional[str] = None, 
#     facebook_name: Optional[str] = None,
#     about: Optional[str] = None,
#     primary_number: Optional[int] = None, 
#     secondary_number: Optional[int] = None, 
#     level: Optional[str] = None,
#     location: Optional[str] = None, 
#     # played_rulesets: Optional[str] = None,
#     # associated_leagues: Optional[str] = None
# ):

#     def check_user(user: users) -> bool:
#         return all(
#             (
#             derby_name is None or user.derby_name == derby_name, 
#             email is None or user.email == email, 
#             facebook_name is None or user.facebook_name == facebook_name, 
#             level is None or user.level == level, 
#             location is None or user.location == location, 
        
#             # played_rulesets is None or user.played_rulesets == played_rulesets,
#             # associated_leagues is None or user.associated_leagues == associated_leagues
#             )
#         )

#     selection = [user for user in users.values() if check_user(user)]
#     # Return the filtered events
#     if not selection:
#         raise HTTPException(status_code=404, detail="No users found")

#     return {
#         "query": {"derby_name": derby_name, "email": email, "facebook_name": facebook_name, "primary_number": primary_number, "level": level, "location": location, "selection": selection, 
#         }
#     }

# ! working on post authentication
# @api_app.post("/users/token", response_model=schemas.UserBase)
# Not that here you are attaching the schema to validate if there is a user in the sceama
# # * Authorization??? May have to use an async function
# async def create_user(user: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
# # def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
#     print(traceback.format_exc())
#     print("you are hitting the users/post route!!!")
    
#     db_user_email = crud.get_user_by_email(db, email=user.email)
#     print("db_user_email:", db_user_email)
#     if db_user_email:
#         raise HTTPException(status_code=400, detail="Email already registered")
    
#     db_user_derby_name = crud.get_user_by_derby_name(db, derby_name=user.derby_name)
#     if db_user_derby_name:
#         raise HTTPException(status_code=400, detail="Derby name already registered")
    
#     username = user.derby_name
#     crud.create_user(db=db, user=user)
    
#     return {"access_token": username, "token_type": "bearer"}

# # * old post add user before schemas database and models and crud.py
# @api_app.post("/users/") 
# def add_user(user: User) -> dict[str, User]: 
    
#     if user.user_id in users:
#         HTTPException(status_code=400, detail=f"User with {user.user_id} already exists")    
    
#     users[user.user_id] = user
#     return {"added": user}








# * NOte I believe there is an easier way to do this... 
# def update_user(
#     user_id: uuid.UUID, 
#     derby_name: Optional[str] = None,
#     password: Optional[str] = None,
#     email: Optional[str] = None, 
#     first_name: Optional[str] = None, 
#     last_name: Optional[str] = None, 
#     facebook_name: Optional[str] = None, 
#     about: Optional[str] = None, 
#     primary_number: Optional[int] = None, 
#     secondary_number: Optional[int] = None, 
#     level: Optional[str] = None, 
#     insurance: Optional[str] = None, 
#     location: Optional[str] = None, 
#     played_rulesets: Optional[List[str]] = [], 
#     associated_leagues: Optional[List[str]] = [],
#     ) -> dict[str, Selection]:
# # *Note that I rewrote this in crud.py not 100% if it will work

#     user = crud.get_user_by_id(user_id)
    
#     if not user: 
#         HTTPException(status_code=404, detail=f"User with {user_id} not found")
#     if all(info is None for  info in (derby_name, email, about, location, level, facebook_name, played_rulesets, associated_leagues)):
#         raise HTTPException(status_code=400, detail="No parameters provided for update.")
    
#     # user = users[user_id]
   
#     if derby_name is not None: 
#         user.derby_name = derby_name
#     if email is not None: 
#         user.email = email
#     if password is not None: 
#         user.password = password 
#     if first_name is not None:
#         user.first_name = first_name
#     if last_name is not None:
#         user.last_name = last_name
#     if facebook_name is not None: 
#         user.facebook_name = facebook_name 
#     if about is not None: 
#         user.about = about 
#     if primary_number is not None: 
#         user.primary_number = primary_number
#     if secondary_number is not None: 
#         user.seondary_Number = secondary_number
#     if level is not None: 
#         user.level = level
#     if insurance is not None: 
#         user.insurance = insurance
#     if location is not None: 
#         user.location = location

#     # *note I have to handle lists like this
#     if played_rulesets:
#         user.played_rulesets.extend(played_rulesets)
#     if associated_leagues:
#         user.associated_leagues.extend(associated_leagues)
 
        
    
#     return {"updated": {"user": user} }   


# from enum import Enum 
# from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
# from datetime import date, time 
# from fastapi import FastAPI, HTTPException, Depends
# from sqlalchemy.orm import Session
# from fastapi.security import OAuth2PasswordBearer
# from pydantic import BaseModel,  validator, field_validator, HttpUrl
# from . import crud, models, schemas
# from .database import SessionLocal, engine
# import uuid 
# import re


# ***** moved these items into schemas***** 

# states_list = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
#                'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
#                'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
#                'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
#                'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

# class Address(BaseModel):
#     street_address: str
#     city: str
#     state: str
#     zip_code: str
    
#     # may need to type code this 
#     @field_validator('state')
#     def validate_us_states(cls, value):
#     # def validate_us_states(cls, value: str) -> str:
#         if value.upper() not in states_list:
#             raise ValueError("Invalid State Code")
#         return value
      
#     @field_validator('zip_code')
#     def validate_zip_codes(cls, value):
#     # def validate_zip_codes(cls, value: str) -> str:
#         regexp = r"^\d{5}(?:-\d{4})?$"
#         match =  bool(re.match(regexp, value))
#         if not match:
#             raise ValueError("Invalid Zip Code")
#         return value
    
# class Location(BaseModel):
#     city: str
#     state_code: str
    
#     @field_validator('state_code')
#     def validate_us_states(cls, v):
#         if v.upper() not in states_list:
#             raise ValueError("Invalid State Code")
#         return v    

# class CommonEventClass(BaseModel):
#     event_id: uuid.UUID
#     address: Address
#     time: time
#     date: date
#     theme: str
#     level: str
#     jersey_colors: str
#     ruleset: str
#     co_ed: bool

#     @field_validator('ruleset', mode="before")
#     @classmethod
#     def ruleset_must_be_valid(cls, value):
#         if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
#             raise ValueError('Invalid ruleset')
#         return value
    
#     # @validator('ruleset', pre=True)
#     # def ruleset_must_be_valid(cls, value):
#     #     if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
#     #         raise ValueError('Invalid ruleset')
#     #     return value
    
#     @field_validator('level', mode="before")
#     @classmethod
#     def level_must_be_valid(cls, value):
#         if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
#             raise ValueError('Invalid level')
#         return value
    
#     # @validator('level', pre=True)
#     # def level_must_be_valid(cls, value):
#     #     if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
#     #         raise ValueError('Invalid level')
#     #     return value
    
    

# class Bout(CommonEventClass):
#     opposing_team: str
#     team: str

# class Mixer(CommonEventClass):
#     signup_link: HttpUrl

# RulesetsType: TypeAlias  = Literal["WFTDA", "USARS", "Banked Track", "Flat Track"]

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
#     insurance: str
#     location: Location
#     associated_leagues: List[str]
#     played_rulesets: List[RulesetsType]

    
# #     # ! note will have to come back to this as check_fields=False I think is wrong???? 
# #     # ! have not found a substitute for each_item=True 
#     @field_validator("played_rulsets", check_fields=False)
#     def ruleset_must_be_valid(cls, ruleset: List[str]) -> List[str]:
#         if ruleset not in rulesets:
#             raise ValueError(f"Invalid ruleset: {ruleset}")
#         return ruleset
    
#     @field_validator('level')
#     @classmethod
#     def level_must_be_valid(cls, value: str) -> str:
#         if value not in ['AA', 'A', 'B', 'C']:
#             raise ValueError('Invalid level')
#         return value
    
    # @validator('played_rulesets', pre=True)
    # @validator('played_rulesets', each_item=True)
    # def ruleset_must_be_valid(cls, ruleset):
    #     if ruleset not in rulesets:
    #         raise ValueError(f"Invalid ruleset: {ruleset}")
    #     return ruleset

# ******* moved the above items to schemas.py 
    
# def fake_user():
#       return User(
#          user_id=uuid.uuid1(),
#          derby_name="Cleo Splatya", 
#          email="CleoSplatya@example.com", 
#          password="test1", 
#          about="Skilled skater who has played in the USARS Nationals", 
#         #  location="Gallup NM", 
#          location=["505 Main St.","Gallup", "NM", "87301"], 
#          level="A level skater",
#          facebook_name="Cleo Thompson",
#          played_rulesets=["WFTDA", "USARS"],
#          associated_leagues=["Cheyenne Roller Derby", "Wydaho", "Colorado", "USARS Nationals Team"]
#     )
      
# def fake_bout():

#     return Bout(
#         event_id=uuid.uuid1(),
#         address="123 Main St, Cheyenne, WY 82001",
#         time=time(15, 30),
#         date= date(2023, 11, 17),
#         theme="Neon Roller Derby",
#         level="AA",
#         jersey_colors="Aqua and Black",
#         ruleset="WFTDA",
#         co_ed=False,
#         opposing_team="Rough Riders"'
        #   team="Cheyenne Capidolls"
#     )
    
# events = { 
#     0:Bout(event_id=uuid.uuid1(),
#         address={
#                 "street_address": "123 Main St",
#                 "city": "Cheyenne",
#                 "state_code": "WY",
#                 "zip_code": "82001"
#                 },
#         time=time(15, 30),
#         date= date(2023, 11, 17),
#         theme="Neon Roller Derby",
#         level="AA",
#         jersey_colors="Aqua and Black",
#         ruleset="WFTDA",
#         co_ed=False,
#         opposing_team="Rough Riders"),
    
#      1:Bout(event_id=uuid.uuid1(),
#         address={
#                 "street_address": "123 Main St",
#                 "city": "Bozeman",
#                 "state_code": "MT",
#                 "zip_code": "59715"
#                 },
#         time=time(17, 30),
#         date= date(2023, 12, 19),
#         theme="Christmas Comes",
#         level="A",
#         jersey_colors="Purple and Black",
#         ruleset="WFTDA",
#         co_ed=False,
#         opposing_team="Hellzzz Belzzz"),
     
#     2:Mixer(event_id=uuid.uuid1(),
#         address={
#                 "street_address": "123 Main St",
#                 "city": "Denver",
#                 "state_code": "CO",
#                 "zip_code": "80014"
#                 },
#         time=time(19, 30),
#         date= date(2023, 12, 2),
#         theme="SlaayBells vs. Paindeer",
#         level="A/B",
#         jersey_colors="White and Black",
#         ruleset="WFTDA",
#         co_ed=False,
#         signup_link="https://www.google.com/maps")
    
    
# }

# users = {
#     0:User(
#          user_id=uuid.uuid1(),
#          derby_name="Cleo Splatya", 
#          password="test2",
#          email="CleoSplatya@example.com", 
#          about="Skilled skater who has played in the USARS Nationals", 
#          location={ 
#                     "city": "Gallup",
#                     "state_code": "NM"
#                     },
#          level="A",
#          facebook_name="Cleo Thompson",
#          played_rulesets=["WFTDA", "USARS"],
#          associated_leagues=["Cheyenne Roller Derby", "Wydaho", "Colorado", "USARS Nationals Team"]
#     ),
    
#     1:User(
#          user_id=uuid.uuid1(),
#          derby_name="Wicked Bitch of the West", 
#          password=:"test3",
#          email="WickedBitchOfTheWest@example.com", 
#          about="Just learning and traveling as I do so!", 
#          location={
#                     "city": "Santa Paula",
#                     "state_code": "CA"
#                     }, 
#          level="C",
#          facebook_name="Sherry Clear",
#          played_rulesets=["WFTDA"],
#          associated_leagues=["California Wreckers"]
#     )
# }

# @api_app.get("/users/me")
# async def query_user():
#     current_user = fake_user()
#     return current_user

# @api_app.get("/bouts/fake_bout")
# async def query_bout():
#     current_bout = fake_bout()
#     return current_bout

# # Event Routes 

