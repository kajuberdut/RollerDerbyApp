from enum import Enum 
from typing import Union, Optional, Any, Annotated, List, Literal, TypeAlias
from datetime import date, time 
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel,  validator, field_validator, HttpUrl
from . import crud, models, schemas
from .database import SessionLocal, engine
import uuid 
import re

# * note: normally you'd want to use migrations and manage them????
# * this was the suggestion on youtube
# models.Base.metadata.create_all(bind=engine)

def create_tables():
	print("create_tables")
	models.Base.metadata.create_all(bind=engine)
 	# Base.metadata.create_all(bind=engine)

api_app = FastAPI()

# this is comunciation with out database.py file
# ensures database is always closed after a request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



states_list = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
               'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
               'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
               'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
               'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

class Address(BaseModel):
    street_address: str
    city: str
    state_code: str
    zip_code: str
    
    # may need to type code this 
    @field_validator('state_code')
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

class CommonEventClass(BaseModel):
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
    
    

class Bout(CommonEventClass):
    opposing_team: str

class Mixer(CommonEventClass):
    signup_link: HttpUrl

RulesetsType: TypeAlias  = Literal["WFTDA", "USARS", "Banked Track", "Flat Track"]

class User(BaseModel):
    user_id: uuid.UUID
    derby_name: str
    password: str
    email: str
    about: str
    location: Location
    level: str
    facebook_name: str
    played_rulesets: List[RulesetsType]
    associated_leagues: List[str]
    
    # ! note will have to come back to this as check_fields=False I think is wrong???? 
    # ! have not found a substitute for each_item=True 
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
    
    # @validator('played_rulesets', pre=True)
    # @validator('played_rulesets', each_item=True)
    # def ruleset_must_be_valid(cls, ruleset):
    #     if ruleset not in rulesets:
    #         raise ValueError(f"Invalid ruleset: {ruleset}")
    #     return ruleset

    
def fake_user():
      return User(
         user_id=uuid.uuid1(),
         derby_name="Cleo Splatya", 
         email="CleoSplatya@example.com", 
         password="test1", 
         about="Skilled skater who has played in the USARS Nationals", 
        #  location="Gallup NM", 
         location=["505 Main St.","Gallup", "NM", "87301"], 
         level="A level skater",
         facebook_name="Cleo Thompson",
         played_rulesets=["WFTDA", "USARS"],
         associated_leagues=["Cheyenne Roller Derby", "Wydaho", "Colorado", "USARS Nationals Team"]
    )
      
def fake_bout():

    return Bout(
        event_id=uuid.uuid1(),
        address="123 Main St, Cheyenne, WY 82001",
        time=time(15, 30),
        date= date(2023, 11, 17),
        theme="Neon Roller Derby",
        level="AA",
        jersey_colors="Aqua and Black",
        ruleset="WFTDA",
        co_ed=False,
        opposing_team="Rough Riders"
    )
    
events = { 
    0:Bout(event_id=uuid.uuid1(),
        address={
                "street_address": "123 Main St",
                "city": "Cheyenne",
                "state_code": "WY",
                "zip_code": "82001"
                },
        time=time(15, 30),
        date= date(2023, 11, 17),
        theme="Neon Roller Derby",
        level="AA",
        jersey_colors="Aqua and Black",
        ruleset="WFTDA",
        co_ed=False,
        opposing_team="Rough Riders"),
    
     1:Bout(event_id=uuid.uuid1(),
        address={
                "street_address": "123 Main St",
                "city": "Bozeman",
                "state_code": "MT",
                "zip_code": "59715"
                },
        time=time(17, 30),
        date= date(2023, 12, 19),
        theme="Christmas Comes",
        level="A",
        jersey_colors="Purple and Black",
        ruleset="WFTDA",
        co_ed=False,
        opposing_team="Hellzzz Belzzz"),
     
    2:Mixer(event_id=uuid.uuid1(),
        address={
                "street_address": "123 Main St",
                "city": "Denver",
                "state_code": "CO",
                "zip_code": "80014"
                },
        time=time(19, 30),
        date= date(2023, 12, 2),
        theme="SlaayBells vs. Paindeer",
        level="A/B",
        jersey_colors="White and Black",
        ruleset="WFTDA",
        co_ed=False,
        signup_link="https://www.google.com/maps")
    
    
}

users = {
    0:User(
         user_id=uuid.uuid1(),
         derby_name="Cleo Splatya", 
         password="test2",
         email="CleoSplatya@example.com", 
         about="Skilled skater who has played in the USARS Nationals", 
         location={ 
                    "city": "Gallup",
                    "state_code": "NM"
                    },
         level="A",
         facebook_name="Cleo Thompson",
         played_rulesets=["WFTDA", "USARS"],
         associated_leagues=["Cheyenne Roller Derby", "Wydaho", "Colorado", "USARS Nationals Team"]
    ),
    
    1:User(
         user_id=uuid.uuid1(),
         derby_name="Wicked Bitch of the West", 
         password=:"test3",
         email="WickedBitchOfTheWest@example.com", 
         about="Just learning and traveling as I do so!", 
         location={
                    "city": "Santa Paula",
                    "state_code": "CA"
                    }, 
         level="C",
         facebook_name="Sherry Clear",
         played_rulesets=["WFTDA"],
         associated_leagues=["California Wreckers"]
    )
}

@api_app.get("/users/me")
async def query_user():
    current_user = fake_user()
    return current_user

@api_app.get("/bouts/fake_bout")
async def query_bout():
    current_bout = fake_bout()
    return current_bout

# Event Routes 

# * this will return all events for /events/ but will also return if searching by any of the below date, theme, level, ruleset, co_ed
# * http://127.0.0.1:8000/events/?level=A

@api_app.get("/events/")
def query_event_by_parameters(
    date: Optional[date] = None,
    theme: Optional[str] = None,
    level: Optional[str] = None,
    ruleset: Optional[str] = None,
    co_ed: Optional[bool] = None
):

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

@api_app.get("/events/{event_id}")
def query_bout(event_id:uuid.UUID) -> Bout:
    if event_id not in events:
        raise HTTPException(
            status_code=404, detail=f"event with {event_id=} does not exist"
        )
    return events[event_id]

# send json to end point and then it will automatically return json data

@api_app.post("/events/bouts") 
def add_bout(bout: Bout) -> dict[str, Bout]: 
    
    if bout.event_id in events:
        HTTPException(status_code=400, detail=f"Bout with {bout.event_id} already exists")    
    
    events[bout.event_id] = bout
    return {"added": bout}

@api_app.post("/events/mixers") 
def add_bout(mixer: Mixer) -> dict[str, Mixer]: 
    
    if mixer.event_id in events:
        HTTPException(status_code=400, detail=f"Mixer with {mixer.event_id} already exists")    
    
    events[mixer.event_id] = mixer
    return {"added": mixer}

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
    ) -> dict[str, Selection]:


    if event_id not in events: 
        HTTPException(status_code=404, detail=f"Event with {event_id} not found")
    if all(info is None for  info in (address, time, date, theme, level, jersey_colors, co_ed, ruleset, opposing_team)):
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


#  **** User routes *** 

# *note here you may need to change the level because you have level as a string

@api_app.get("/users/")
def query_user_by_parameters(
    derby_name: Optional[str] = None,
    location: Optional[str] = None,
    level: Optional[str] = None,
    facebook_name: Optional[str] = None,
    # played_rulesets: Optional[str] = None,
    # associated_leagues: Optional[str] = None
):

    def check_user(user: users) -> bool:
        return all(
            (
            derby_name is None or user.derby_name == derby_name, 
            location is None or user.location == location, 
            level is None or user.level == level, 
            facebook_name is None or user.facebook_name == facebook_name, 
            # played_rulesets is None or user.played_rulesets == played_rulesets,
            # associated_leagues is None or user.associated_leagues == associated_leagues
            )
        )

    selection = [user for user in users.values() if check_user(user)]
    # Return the filtered events
    if not selection:
        raise HTTPException(status_code=404, detail="No users found")

    return {
        "query": {"derby_name": derby_name, "location": location, "level": level, "facebook_name": facebook_name, "selection": selection, 
        }
    }


# * old post add user before schemas database and models and crud.py
# @api_app.post("/users/") 
# def add_user(user: User) -> dict[str, User]: 
    
#     if user.user_id in users:
#         HTTPException(status_code=400, detail=f"User with {user.user_id} already exists")    
    
#     users[user.user_id] = user
#     return {"added": user}

@app.post("/users/", response_model=schemas.User)
def add_user(user: schemas.UserAdd, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.add_user(db=db, user=user)


@api_app.put("/users/{user_id}")
def update_user(
    user_id: uuid.UUID, 
    derby_name: Optional[str] = None,
    password: Optional[str] = None,
    email: Optional[str] = None, 
    about: Optional[str] = None, 
    location: Optional[str] = None, 
    level: Optional[str] = None, 
    facebook_name: Optional[str] = None, 
    played_rulesets: Optional[List[str]] = [], 
    associated_leagues: Optional[List[str]] = [],
    ) -> dict[str, Selection]:


    if user_id not in users: 
        HTTPException(status_code=404, detail=f"User with {user_id} not found")
    if all(info is None for  info in (derby_name, email, about, location, level, facebook_name, played_rulesets, associated_leagues)):
        raise HTTPException(status_code=400, detail="No parameters provided for update.")
    
    user = users[user_id]
    if derby_name is not None: 
        user.derby_name = derby_name
    if email is not None: 
        user.email = email
    if passowrd is not None: 
        user.password = password 
    if about is not None: 
        user.about = about
    if location is not None: 
        user.location = location
    if level is not None: 
        user.level = level
    if facebook_name is not None: 
        user.facebook_name = facebook_name
    # *note I have to handle lists like this
    if played_rulesets:
        user.played_rulesets.extend(played_rulesets)
    if associated_leagues:
        user.associated_leagues.extend(associated_leagues)
 
        
    
    return {"updated": {"user": user} }   