
# ! test for sqlalchemy follow along
from fastapi import Depends, FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# * imports for incase from patrick
from incase.middleware import JSONCaseTranslatorMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from incase import Case, Caseless
import json
import typing
# * imports for incase from patrick

RequestResponseEndpoint = typing.Callable[[Request], typing.Awaitable[Response]]


import traceback
from . import crud, models, schemas

# ! authentication imports 
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

load_dotenv()


from .database import SessionLocal, engine, create_all_tables

print("engine in main.py:", engine)

print("main.py is running")

create_all_tables()

models.SQLAlchemyBase.metadata.create_all(bind=engine)

# *everything  below is for incase patrick middle

# class MaybeJsonAsyncIterator:
#     """This is used to wrap the iterable body of the streaming response
#     so that the json keys can be handled when the iterable is called.
#     """

def __init__(self):
    self._iterable = []
    self.length = 0

async def ingest_body_iterable(self, base_iterable):
    async for part in base_iterable:
        try:
            json_content = json.loads(part)
            new_part = json.dumps(
                {
                    Caseless(key)[Case.CAMEL]: value
                    for key, value in json_content.items()
                }
            ).encode(encoding="utf-8")
            self.length += len(new_part)
            self._iterable.append(new_part)
        except json.JSONDecodeError:
            self.length += len(part)
            self._iterable.append(part)

def __aiter__(self):
    return self

async def __anext__(self):
    for item in self._iterable:
        return item
    raise StopAsyncIteration


class JSONCaseTranslatorMiddleware(BaseHTTPMiddleware):
# """This middleware translates the case of json keys recieved and sent by the
# asgi app. It is helpful for allowing a python back-end to use snake_case
# while allowing a javascript front end to use camelCase."""

    print(" JSONCaseTranslatorMiddleware(BaseHTTPMiddleware) IS RUNNING ")

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint):
        print(" !!!! dispatch(self, request: Request, call_next: RequestResponseEndpoint) IS RUNNING ")
        try:
            print("try statement is running")
            data = await request.body()
            request._body = json.dumps(
                {
                    Caseless(key)[Case.SNAKE]: value
                    for key, value in json.loads(data).items()
                }
            ).encode(encoding="utf-8")
            request.content_length = len(request._body)
        except json.JSONDecodeError:
            pass  # guess it wasn't json
        response = await call_next(request)
        if response.headers.get("content-type") == "application/json":
            new_body = MaybeJsonAsyncIterator()
            await new_body.ingest_body_iterable(response.body_iterator)
            response.body_iterator = new_body
        return response

    
# *Everything above is for incase middle from patrick


# * Auth Token

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

api_app = FastAPI()

# api_app.add_middleware(JSONCaseTranslatorMiddleware)

origins = [
    "http://localhost/3000",
    # "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000"
    
]

api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # ensures database is always closed after a request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


#  **** Token routes for testing Authentication *** 

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# *** HASH PASSWORD FOR NEW USER **** 

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password):
    return pwd_context.hash(password)

def authenticate_user(db, username: str, password: str):
    # gets user from database by using the username that was submitted on the frontend
    user = crud.get_user_by_username(db, username)
    print("user in authenticte user in main.py:", user)
    # print("password in authenticate user", user.hashed_password)
    if not user:
        return False
    # calls verify password to compare the password the user submitted on the frontend to the hashed password on the backend 
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(fake_users_db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

# # # ! authentication testing post testing

@api_app.post("/token",  response_model=schemas.Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):

    # authenticates user and then returns user 
    print("form_data.username in main.py:", form_data.username)
    print("form_data.password in main.py:", form_data.password)
    user = authenticate_user(db, form_data.username, form_data.password)
    print("user in main.py:", user)
    if not user:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Incorrect username or password",
                    headers={"WWW-Authenticate": "Bearer"},
                )
    
    access_token = create_access_token(data={"sub": user.user_id})

    return {"access_token": access_token, "token_type": "bearer"}

#  **** User routes *** 


# * get /users/ 
# * returns all users  

# @api_app.get("/users/", response_model=list[schemas.UserBase])
# # def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(oauth2_scheme)):
# # def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
# # *THIS APPEARS TO BE AUTHENTICATED AND EXPECTS A TOKEN NOW
# def get_users(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
#     users = crud.get_users(db, skip=skip, limit=limit)

#     return users

@api_app.get("/users/", response_model=list[schemas.UserBase])
def get_users(token: Annotated[str, Depends(oauth2_scheme)], city: str = Query(None), state: str = Query(None), username: str = Query(None), skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    users = crud.get_users(db, city=city, state=state, username=username, skip=skip, limit=limit)

    return users


# * get /users/{derby_name} 
# * returns one specific user

# @api_app.get("/users/{derby_name}", response_model=schemas.UserBase)
@api_app.get("/users/{username}", response_model=schemas.UserDetailsPublic)
# ! Note: this allows us to get user information that is public information not private information so private information is not being sent back and forth through the api.

# todo: this is not working when the user does not have other data that is optional in it
def get_user(token: Annotated[str, Depends(oauth2_scheme)], username: str, db: Session = Depends(get_db)):
    
    user = crud.get_user_by_username(db, username=username)
    
    if username is None: 
        raise HTTPException(status_code=404, detail=f"User with derby name {username} not found.")
    
    return user

# * get /login/{user_id} 
# * returns one specific user by user_id

@api_app.get("/login/{user_id}", response_model=schemas.UserDetailsPrivate)
# @api_app.get("/login/{user_id}", response_model=schemas.UserBase)
def get_user(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db)):
# def get_user(user_id: int, db: Session = Depends(get_db)):
    print("users/user_id is running")
    
    user = crud.get_user_by_id(db, user_id=user_id)
    print("!!! user in /login/{user_id}", user)
    print("!!! user.username", user.username)
    print("!!! user.email", user.email)
    print("!!! user.first_name", user.first_name)
    print("!!! user.ruleset:", user.ruleset)
    # !this is now returning the user with an empty ruleset or the rulesets themeselves.
    # ? this is an empty object that is returning I dont know how to get the associated ruleset with this obect 
    # print("user.ruleset in main.py :", user.ruleset)
    # print("user.ruleset[0].name in main.py :", user.ruleset[0].name)
    # print("user.ruleset.ruleset_id:", user.ruleset.ruleset_id)
    
    
    # user.username
    # user = crud.get_user_by_id(db, user_id=user_id)
    if user is None: 
    # if user_id is None: 
        raise HTTPException(status_code=404, detail=f"User with user id of {user_id} not found.")
    
    # user = {
    # # "derby_name": user.derby_name,
    # "username": user.username,
    # "email": user.email,
    # "first_name": user.first_name, 
    # "last_name": user.last_name,
    # "facebook_name": user.facebook_name, 
    # "about": user.about,
    # "primary_number": user.primary_number, 
    # "secondary_number": user.secondary_number,
    # "level": user.level,
    # "ruleset_id": user.ruleset_id,
    # "position_id": user.position_id,
    # "location_id": user.location_id,
    # "associated_leagues": user.associated_leagues
    # }
    
    
    return user

# * post /users/ 
# * creates a new user 

@api_app.post("/users/", response_model=schemas.UserBase)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    hashed_password = hash_password(user.password)
    print("hashed!!!!password!!!!", hashed_password)

    user.password = hashed_password   
    # print(traceback.format_exc())
    print("you are hitting the users/post route!!!")
    print("&&& user &&&", user)
    
    db_user_email = crud.get_user_by_email(db, email=user.email)
    print("db_user_email:", db_user_email)
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_username = crud.get_user_by_username(db, username=user.username)
    if db_user_username:
        raise HTTPException(status_code=400, detail="Derby name already registered")
    
    # todo you will need to create a new access token for this I believe. 
    return crud.create_user(db=db, user=user)


# * put /users/{user_id} 
# * updates an existing user with rulesets and location positions

# ! NEED TO VERIFY THAT THE TOKEN MATCHES THE USER WE ARE TRYING TO UPDATE
# todo: COME BACK TO THIS TOMORROW NOTE THAT YOU NEED TO MAKE SURE YOU ARE ADDING THE user_id and ruleset_id to the USER_RULESET table

@api_app.put("/users/{user_id}", response_model=schemas.UserUpdate)
def update_user(token: Annotated[str, Depends(oauth2_scheme)], user: schemas.UserUpdate, ruleset: list[schemas.Ruleset], position: list[schemas.Position], insurance: list[schemas.Insurance], location: schemas.Location, user_id: int, db: Session = Depends(get_db)):
    print("!!!! INSURANCE IN MAIN.PY !!!! ", insurance)
    
    # print("**** ruleset ****:", ruleset)
    
    existing_location = crud.get_location(db=db, location=location)
    
    if existing_location: 
        location_id = existing_location.location_id 
    else: 
        location_id = crud.create_location(db=db, location=location)
    
    user.location_id = location_id
    
    for pos in position:
        existing_position = crud.get_position(db=db, position=pos)
    
        if existing_position: 
            position_id = existing_position.position_id 
        else: 
            position_id = crud.create_position(db=db, position=pos)
    
        existing_user_position = crud.get_user_position_by_id(db, user_id=user_id, position_id=position_id)
        print("does existing_user_position exist?", existing_user_position)
        if not existing_user_position:
            print("crud existing_user_position does NOT exist")
            new_e_u_p = crud.create_user_position(db, user_id=user_id, position_id=position_id)
            # print("new existing user position:", new_e_u_p)
 
    
    # !now we have a list of rulesets instead of a singlular ruleset so.... we need to loop through the list and get each ruleset
    for rs in ruleset: 
        # existing_ruleset = crud.get_ruleset(db=db, rs=ruleset)
        existing_ruleset = crud.get_ruleset(db=db, ruleset=rs)
        # print(" ##### existing_ruleset #######", existing_ruleset)
    
    
        if existing_ruleset: 
            ruleset_id = existing_ruleset.ruleset_id
        else: 
            ruleset_id = crud.create_ruleset(db=db, ruleset=rs)
    # ruleset_id = crud.create_ruleset(db=db, wftda=ruleset.wftda, usars=ruleset.usars, banked_track=ruleset.banked_track, short_track=ruleset.short_track)
    # user.ruleset = ruleset
        existing_user_ruleset = crud.get_user_ruleset_by_id(db, user_id=user_id, ruleset_id=ruleset_id)
        print("does existing_user_ruleset exist?", existing_user_ruleset)
        if not existing_user_ruleset:
            print("crud existing_user_ruleset does NOT exist")
            new_e_u_r = crud.create_user_ruleset(db, user_id=user_id, ruleset_id=ruleset_id)
            # print("new existing user ruleset:", new_e_u_r)
            
    for ins in insurance: 

        existing_insurance = crud.get_insurance(db=db, insurance=ins)
      
        if existing_insurance: 
            insurance_id = existing_insurance.insurance_id

        else: 
            insurance_id = crud.create_insurance(db=db, insurance=ins)
 
        existing_user_insurance = crud.get_user_insurance_by_id(db, user_id=user_id, insurance_id=insurance_id)
     
        if not existing_user_insurance:
            new_e_u_i = crud.create_user_insurance(db, user_id=user_id, insurance_id=insurance_id, insurance_number=ins.insurance_number) 
  
    print('user in /users/{user_id}', user)
    
    db_user = crud.get_user_by_id(db, user_id=user_id)    
    
    if not db_user:
        raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
    return crud.update_user(db=db, user=user, user_id=user_id)

# @api_app.put("/users/{user_id}", response_model=schemas.UserUpdate)
# def update_user(user: schemas.UserUpdate, user_id: int, db: Session = Depends(get_db)):
    
#     print('user in /users/{user_id}', user)
    
#     db_user = crud.get_user_by_id(db, user_id=user_id)    
 
#     if not db_user:
#         raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
#     return crud.update_user(db=db, user=user, user_id=user_id)



# * delete /users/{user_id} 
# * deletes an existing user 
# ! WILL HAVE TO VERIFY THAT THE TOKEN MATCHES THE USER THAT YOU ARE TRYING TO DELETE 
# ! WILL ALSO NEED A FORM TO SUBMIT PASSWORD AND WILL HAVE TO CHECK THAT AGAINST THE db_user
@api_app.delete("/users/{user_id}", response_model=schemas.UserDelete)
def delete_user(token: Annotated[str, Depends(oauth2_scheme)], user: schemas.UserDelete, user_id: int, db: Session = Depends(get_db)):
# def delete_user(user: schemas.UserDelete, user_id: int, db: Session = Depends(get_db)):
    
    db_user = crud.get_user_by_id(db, user_id=user.user_id)      
    
 
    if not db_user:
        raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
    crud.delete_user(db=db, user=user, user_id=user.user_id)
    return { "user_id": 0, "password": "deleted"}
    


#  **** Event routes *** 

# * get /events/ 
# * returns all events  

@api_app.get("/events/", response_model=list[schemas.EventBase])
def get_events(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

# * get /events/{event_type} 
# * returns all events that match query by type, dates and city and/or state

# !         WORKING HERE 
#  todo *********************

@api_app.get("/events/{type}", response_model=list[schemas.EventBase])
def get_events(token: Annotated[str, Depends(oauth2_scheme)], type: str, city: str = Query(None), state: str = Query(None), zip_code: str = Query(None), start_date: str = Query(None), end_date: str = Query(None), db: Session = Depends(get_db)):
    print("main.py is running for /events/{type}")
    print("type in main.py", type)
    print("city in main.py:", city)
    print("start_date in main.py", start_date)
    print("end_date in main.py:", end_date)
    
    events = crud.get_events_by_type_date_location(db, type=type, city=city, state=state, zip_code=zip_code, start_date=start_date, end_date=end_date)
    
    print("events in get /events/{type} in main.py", events)
    return events


# * get /bouts/ 
# * returns all bouts

@api_app.get("/bouts/", response_model=list[schemas.Bout])
def get_bouts(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bouts = crud.get_bouts(db, skip=skip, limit=limit)
    return bouts

# * get /bouts/{event_id} 
# * returns one bout 

@api_app.get("/bouts/{event_id}", response_model=schemas.Bout)
def get_bout(token: Annotated[str, Depends(oauth2_scheme)], event_id: int, db: Session = Depends(get_db)):
    
    bout = crud.get_bout_by_id(db, event_id=event_id)
    
    if event_id is None: 
        raise HTTPException(status_code=404, detail=f"Bout with event id {event_id} not found.")
    
    return bout

# * get /mixers/ 
# * returns all mixers

@api_app.get("/mixers/", response_model=list[schemas.Mixer])
def get_mixers(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    mixers = crud.get_mixers(db, skip=skip, limit=limit)
    return mixers

# * get /mixers/{event_id} 
# * returns one mixer 

@api_app.get("/mixers/{event_id}", response_model=schemas.Mixer)
def get_mixer(token: Annotated[str, Depends(oauth2_scheme)], event_id: int, db: Session = Depends(get_db)):
    
    mixer = crud.get_mixer_by_id(db, event_id=event_id)
    
    if event_id is None: 
        raise HTTPException(status_code=404, detail=f"Mixer with event id {event_id} not found.")
    
    return mixer
# * post /bouts/ 
# * creates a new bout 
# !  working post bout without address field
# @api_app.post("/bouts/", response_model=schemas.EventBase)
# def create_bout(bout: schemas.Bout, db: Session = Depends(get_db)):
    
    
#     print(traceback.format_exc())
#     print("you are hitting the bouts post route!!!")
#     print("****** bout *****:", bout)
#     print("****** bout.time_zone *****:", bout.time_zone)
#     print("****** type bout.time_zone *****:", type(bout.time_zone))
   
#     return crud.create_bout(db=db, bout=bout)

# ! trial for posting bout information with an address
@api_app.post("/bouts/", response_model=schemas.EventBase)
def create_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: schemas.Bout, address: schemas.Address, db: Session = Depends(get_db)):
    
    existing_address = crud.get_address(db=db, address=address)
    
    if existing_address: 
        address_id = existing_address.address_id
    else:
        address_id = crud.create_address(db=db, address=address)

    bout.address_id = address_id
    existing_bout = crud.get_bout_by_address_date_time_team_opposing_team(db=db, bout=bout)

    if existing_bout: 
        raise HTTPException(status_code=409, detail=f"Bout already exists at the same address, on the same date, at the same time, and with the same teams.")
   
    print("!!!! bout !!!! in main.py", bout)
    return crud.create_bout(db=db, bout=bout)

# * post /mixers/ 
# * creates a new mixer

# @api_app.post("/mixers/", response_model=schemas.EventBase)
# def create_mixer(mixer: schemas.Mixer, db: Session = Depends(get_db)):
    
#     return crud.create_mixer(db=db, mixer=mixer)

# * post /mixers/ 
# * creates a new mixer with address 

@api_app.post("/mixers/", response_model=schemas.EventBase)
def create_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: schemas.Mixer, address: schemas.Address, db: Session = Depends(get_db)):
    print("****** mixer *****:", mixer)
    existing_address = crud.get_address(db=db, address=address)
    
    print(traceback.format_exc())

    if existing_address: 
        address_id = existing_address.address_id
    else:
        address_id = crud.create_address(db=db, address=address)
        
  
    mixer.address_id = address_id
    existing_mixer = crud.get_mixer_by_address_date_time_theme(db=db, mixer=mixer)
    print("mixer.address_id", mixer.address_id)
    
    print("****** existing_mixer *****:", existing_mixer)
    if existing_mixer: 
        raise HTTPException(status_code=409, detail=f"Mixer already exists at the same address, on the same date, at the same time, and with the same theme.")
  
    # print("bout!!!! in post bouts:", bout)
    # crud.create_bout(db=db, bout=bout)
   
    return crud.create_mixer(db=db, mixer=mixer)


# * put /bouts/{event_id} 
# * updates an existing bout 

@api_app.put("/bouts/{event_id}", response_model=schemas.BoutUpdate)
def update_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: schemas.BoutUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /bouts/{event_id}', bout)
    
    db_bout = crud.get_bout_by_id(db, event_id=event_id)    
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud.update_bout(db=db, bout=bout, event_id=event_id)

# * put /mixers/{event_id} 
# * updates an existing mixer 

@api_app.put("/mixers/{event_id}", response_model=schemas.MixerUpdate)
def update_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: schemas.MixerUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /mixers/{event_id}', mixer)
    
    db_mixer = crud.get_mixer_by_id(db, event_id=event_id)    
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud.update_mixer(db=db, mixer=mixer, event_id=event_id)

# * delete /bouts/{event_id} 
# * deletes an existing bout
# ! note you may have to add some security measures on this

@api_app.delete("/bouts/{event_id}", response_model=schemas.EventDelete)
def delete_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: schemas.EventDelete, event_id: int, db: Session = Depends(get_db)):
    
    print('bout in /bouts/{event_id}', bout)
    
    # ! this grabs the user_id from the parameter
    # db_user = crud.get_user_by_id(db, user_id=user_id)
    # ! this grabs the user_id from the passed in user object  
    db_bout = crud.get_bout_by_id(db, event_id=bout.event_id)      
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud.delete_bout(db=db, bout=bout, event_id=bout.event_id)

# * delete /mixers/{event_id} 
# * deletes an existing mixer
# ! note you may have to add some security measures on this

@api_app.delete("/mixers/{event_id}", response_model=schemas.EventDelete)
def delete_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: schemas.EventDelete, event_id: int, db: Session = Depends(get_db)):
    
    print('mixer in /mixers/{event_id}', mixer)
    
    # ! this grabs the user_id from the parameter
    # db_user = crud.get_user_by_id(db, user_id=user_id)
    # ! this grabs the user_id from the passed in user object  
    db_mixer = crud.get_mixer_by_id(db, event_id=mixer.event_id)      
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud.delete_mixer(db=db, mixer=mixer, event_id=mixer.event_id)

#  **** address routes *** 

# * post /address/ 
# * adds an address

@api_app.post("/address/", response_model=schemas.Address)
def create_address(token: Annotated[str, Depends(oauth2_scheme)], address: schemas.Address, db: Session = Depends(get_db)):
    
    return crud.create_address(db=db, address=address)

# * get /address/ 
# * gets all addresses 

@api_app.get("/address/", response_model=list[schemas.Address])
def get_addresses(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_addresses(db, skip=skip, limit=limit)

# * get /address/{address_id} 
# * gets one address by id

@api_app.get("/address/{address_id}", response_model=schemas.Address)
def get_address(token: Annotated[str, Depends(oauth2_scheme)], address_id:int, db: Session = Depends(get_db)):
    
    return crud.get_address_by_id(db, address_id=address_id)

#  **** ruleset routes ***

# * get /user/ruleset/ 
# * gets all user rulesets 

@api_app.get("/user/ruleset/", response_model=list[schemas.UserRuleset])
def get_users_rulesets(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud.get_user_ruleset(db, skip=skip, limit=limit)
# * get /rulesets/ 
# * gets all rulesets 

@api_app.get("/rulesets/", response_model=list[schemas.Ruleset])
def get_rulesets(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_rulesets(db, skip=skip, limit=limit)

# * get /rulesets/{ruleset_id} 
# * gets one ruleset by id

@api_app.get("/rulesets/{ruleset_id}", response_model=schemas.Ruleset)
def get_ruleset(token: Annotated[str, Depends(oauth2_scheme)], ruleset_id:int, db: Session = Depends(get_db)):
    
    return crud.get_ruleset_by_id(db, ruleset_id=ruleset_id)

#  **** position routes ***

# * get /user/position/ 
# * gets all user positions 

@api_app.get("/user/position/", response_model=list[schemas.UserPosition])
def get_users_positions(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud.get_user_position(db, skip=skip, limit=limit)

# * get /positions/ 
# * gets all positions 

@api_app.get("/positions/", response_model=list[schemas.Position])
def get_positions(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_positions(db, skip=skip, limit=limit)
    
# * get /positions/{position_id} 
# * gets one position by id

@api_app.get("/positions/{position_id}", response_model=schemas.Position)
def get_position(token: Annotated[str, Depends(oauth2_scheme)], position_id:int, db: Session = Depends(get_db)):
    
    return crud.get_position_by_id(db, position_id=position_id)

#  **** insurance routes ***

# * get /user/insurance/ 
# * gets all user positions 

@api_app.get("/user/insurance/", response_model=list[schemas.UserInsurance])
def get_users_insurance(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud.get_user_insurance(db, skip=skip, limit=limit)

# * get /insurances/ 
# * gets all insurance

@api_app.get("/insurance/", response_model=list[schemas.Insurance])
def get_insurances(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_insurances(db, skip=skip, limit=limit)
    
# * get /insurances/{insurance_id} 
# * gets one insurance by id

# @api_app.get("/insurances/{insurance_id}", response_model=schemas.Insurance)
@api_app.get("/insurances/{insurance_id}", response_model=schemas.InsuranceOutput)
def get_insurance(token: Annotated[str, Depends(oauth2_scheme)], insurance_id:int, db: Session = Depends(get_db)):
    
    return crud.get_insurance_by_id(db, insurance_id=insurance_id)

#  **** location routes ***

# * get /locations/ 
# * gets all locations 

@api_app.get("/locations/", response_model=list[schemas.Location])
def get_locations(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_locations(db, skip=skip, limit=limit)
    
# * get /locations/{location_id} 
# * gets one location by id

@api_app.get("/locations/{location_id}", response_model=schemas.Location)
def get_location(token: Annotated[str, Depends(oauth2_scheme)], location_id:int, db: Session = Depends(get_db)):
    
    return crud.get_location_by_id(db, location_id=location_id)