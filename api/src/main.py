from enum import Enum 
from typing import Union, Optional, Any, Annotated, List
from datetime import date, time 
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel,  validator, HttpUrl
import uuid 

api_app = FastAPI()

class CommonEventClass(BaseModel):
    event_id: uuid.UUID
    address: str
    time: time
    date: date
    theme: str
    level: str
    jersey_colors: str
    ruleset: str
    co_ed: bool

    
    @validator('ruleset', pre=True)
    def ruleset_must_be_valid(cls, value):
        if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
            raise ValueError('Invalid ruleset')
        return value
    
    @validator('level', pre=True)
    def level_must_be_valid(cls, value):
        if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
            raise ValueError('Invalid level')
        return value

class Bout(CommonEventClass):
    opposing_team: str

class Mixer(CommonEventClass):
    signup_link: HttpUrl

rulesets = ["WFTDA", "USARS", "Banked Track", "Flat Track"]

class User(BaseModel):
    user_id: uuid.UUID
    derby_name: str
    email: str
    about: str
    location: str
    level: str
    facebook_name: str
    played_rulesets: List[str]
    associated_leagues: List[str]
    
    # @validator('played_rulesets', pre=True)
    @validator('played_rulesets', each_item=True)
    def ruleset_must_be_valid(cls, ruleset):
        if ruleset not in rulesets:
            raise ValueError(f"Invalid ruleset: {ruleset}")
        return ruleset
    
    
def fake_user():
      return User(
         user_id=uuid.uuid1(),
         derby_name="Cleo Splatya", 
         email="CleoSplatya@example.com", 
         about="Skilled skater who has played in the USARS Nationals", 
         location="Gallup NM", 
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
        address="123 Main St, Cheyenne, WY 82001",
        time=time(15, 30),
        date= date(2023, 11, 17),
        theme="Neon Roller Derby",
        level="AA",
        jersey_colors="Aqua and Black",
        ruleset="WFTDA",
        co_ed=False,
        opposing_team="Rough Riders"),
    
     1:Bout(event_id=uuid.uuid1(),
        address="123 Main St, Bozeman, MT 82001",
        time=time(17, 30),
        date= date(2023, 12, 19),
        theme="Christmas Comes",
        level="A",
        jersey_colors="Purple and Black",
        ruleset="WFTDA",
        co_ed=False,
        opposing_team="Hellzzz Belzzz"),
     
    2:Mixer(event_id=uuid.uuid1(),
        address="123 Main St, Denver, CO 82001",
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
         email="CleoSplatya@example.com", 
         about="Skilled skater who has played in the USARS Nationals", 
         location="Gallup NM", 
         level="A level skater",
         facebook_name="Cleo Thompson",
         played_rulesets=["WFTDA", "USARS"],
         associated_leagues=["Cheyenne Roller Derby", "Wydaho", "Colorado", "USARS Nationals Team"]
    ),
    
    1:User(
         user_id=uuid.uuid1(),
         derby_name="Wicked Bitch of the West", 
         email="WickedBitchOfTheWest@example.com", 
         about="Just learning and traveling as I do so!", 
         location="Santa Paula CA", 
         level="C level skater",
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

@api_app.post("/events/bout") 
def add_bout(bout: Bout) -> dict[str, Bout]: 
    
    if bout.event_id in events:
        HTTPException(status_code=400, detail=f"Bout with {bout.event_id} already exists")    
    
    events[bout.event_id] = bout
    return {"added": bout}

@api_app.post("/events/mixer") 
def add_bout(mixer: Mixer) -> dict[str, Mixer]: 
    
    if mixer.event_id in events:
        HTTPException(status_code=400, detail=f"Mixer with {mixer.event_id} already exists")    
    
    events[mixer.event_id] = mixer
    return {"added": mixer}

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

    # return {
    #     "query": {"derby_name": derby_name, "location": location, "level": level, "facebook_name": facebook_name, "played_rulesets": played_rulesets, "associated_leagues": associated_leagues, "selection": selection, 
    #     }
    
    return {
        "query": {"derby_name": derby_name, "location": location, "level": level, "facebook_name": facebook_name, "selection": selection, 
        }
    }
    
@api_app.post("/users/") 
def add_user(user: User) -> dict[str, User]: 
    
    if user.user_id in users:
        HTTPException(status_code=400, detail=f"User with {user.user_id} already exists")    
    
    users[user.user_id] = user
    return {"added": user}