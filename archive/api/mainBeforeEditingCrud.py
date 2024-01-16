from fastapi import FastAPI, Depends, FastAPI, HTTPException, status, Query, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import traceback
# from . import crud, models, schemas
# from . import crud, model
from ...api.src import models
# from schemas import UserSchema
from ...api.src.schemas.address_schema import *
from ...api.src.schemas.chat_schema import *
from ...api.src.schemas.event_schema import *
from ...api.src.schemas.group_schema import *
from ...api.src.schemas.insurance_schema import *
from ...api.src.schemas.location_schema import *
from ...api.src.schemas.message_schema import *
from ...api.src.schemas.position_schema import *
from ...api.src.schemas.ruleset_schema import *
from ...api.src.schemas.token_schema import *
from ...api.src.schemas.user_schema import *

from ...api.src.crud.address_crud import *
from ...api.src.crud.chat_crud import *
from ...api.src.crud.event_crud import *
from ...api.src.crud.group_crud import *
from ...api.src.crud.insurance_crud import *
from ...api.src.crud.location_crud import *
from ...api.src.crud.message_crud import *
from ...api.src.crud.position_crud import *
from ...api.src.crud.ruleset_crud import *
from ...api.src.crud.user_crud import *



from ...api.src.database import SessionLocal, engine, create_all_tables
import json


# # ? imports for incase from patrick
from fastapi.requests import Request
from fastapi.responses import JSONResponse, HTMLResponse
from incase.middleware import JSONCaseTranslatorMiddleware, CamelJsonResponse
# # ? imports for incase from patrick

# # ! authentication imports 
from typing import Annotated, Any, Union
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from dotenv import load_dotenv
 # ! authentication imports 
 
load_dotenv()

print("engine in main.py:", engine)

print("main.py is running")

create_all_tables()

models.SQLAlchemyBase.metadata.create_all(bind=engine)

# * Auth Token

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# * Auth Token

api_app = FastAPI()

# ?everything  below is for incase patrick middle *****************************

api_app = FastAPI(default_response_class=CamelJsonResponse)
api_app.add_middleware(JSONCaseTranslatorMiddleware, handle_response=False)

# ?everything  below is for incase patrick middle *****************************

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
        
        
# class UserWebSocket(WebSocket):
#     def __init__(self, *args, user_id: int, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.user_id = user_id
        
    # ! added this not necessary for base usage
    
# ************** WEB SOCKETS below ********************

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        print("!! ! self.active_connectiosn", self.active_connections)
    
    # * connect this user the logged in user to the websocket active_connections list
    async def connect(self, websocket: WebSocket, user_id: int):
        print("In connect in main.py the user_id:", user_id)
        await websocket.accept()
        websocket.user_id = user_id 
        self.active_connections.append(websocket)
        # new user comes to our connection then added to the list of active_connections

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        # This is disconnecting them from that connection

    async def send_personal_message(self, message: str, websocket: WebSocket):
        print("hitting send_personal_message")
        await websocket.send_text(message)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    
manager = ConnectionManager()

@api_app.websocket("/ws/{user_id}")
# @api_app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
# async def websocket_endpoint(websocket: UserWebSocket, user_id: int):
    print("websocket is running /ws/{user_id}")
    print("websocket.scope['path']:", websocket.scope["path"])
    print("user_id in main.py", user_id)
    
    # websocket = UserWebSocket(user_id=user_id)
    # ! added this not necessary for base usage
    
    # participant_message = crud.create_message(db=db, )
    
    await manager.connect(websocket, user_id)
    try: 
        while True:
            data = await websocket.receive_text()
            
            
            print("data in main.py:", data)
            # print("data.message in main.py:", data.message)
            data_dict = json.loads(data)
            print("data_dict:", data_dict)
            message_id = data_dict["messageId"]
            message = data_dict["message"]
            sender_id = data_dict["senderId"]
            participant_ids = sorted(data_dict["participantIds"])
            date_time = data_dict["dateTime"]
            chat_id = data_dict["chatId"]
            
            # print("message_id", message_id )
            # print("type message_id", type(message_id))
            # print("date_time: ******", date_time)
            # print("type date_time: ******", type(date_time))
            # print("message in main.py **** ", message)
            # print("sender id in main.py ****", sender_id)
            print("participant_ids in main.py ****", participant_ids)
            print("chat_id in main.py ****", chat_id)
            
      
            
            if chat_id == 0:
                
                # chat_db = crud.get_chat_id_by_participants(db=db,  participant_ids=participant_ids)
                group_db = crud.get_group_id_by_participants(db=db, participant_ids=participant_ids)
                
                if not group_db:
                    
                    group = {
                        "participant_ids": participant_ids,
                        "name": "Testing"
                    }
                    
                    group_db = crud.create_group(db=db, group=group)
                    
                    for participant_id in participant_ids: 
                        
                        # ensures user exists 
                        user_db = crud.get_user_by_id(db=db, user_id=participant_id)
                             
                        if user_db: 
                            user_group = {
                                "user_id": participant_id,
                                "group_id": group_db.group_id
                            }
                            user_group_db = crud.add_user_to_group(db=db, user_group=user_group)
                            
                if group_db: 
                    chat_db = crud.get_chat_by_group_id(db=db, group_id=group_db.group_id)       
                    # ! not sure if this is indented properly
                    
                    if not chat_db: 
                        chat = {
                            "group_id": group_db.group_id
                        }
                        
                        chat_db = crud.create_chat(db=db, chat=chat)
                    
                    print("*****************chat_db ********************", chat_db)
                    print("*****************chat_d.chat_id ********************", chat_db)
                    
                    chat_id = chat_db.chat_id
            # print("*****************chat_id ********************", chat_id)
                
                 # * add to message to database for user
            # ! THIS IS NOT RETURNING MY MESSAGE ID NOT SURE WHY 
            new_message = {
                # "message_id": 0,
                "chat_id": chat_id,
                "message": message, 
                "date_time": date_time,
                "sender_id": sender_id
                # "participant_ids": participant_ids
            }
            
            
            db_message_id = crud.create_message(db=db, message=new_message)
    
            # db_user_message = crud.create_user_message(db=db, sender_id=sender_id, message_id=db_message_id, participant_ids=participant_ids)
            
            
            for participant_id in participant_ids:
                print("handling participant_id:", participant_id)
                
                participant_connection = next((conn for conn in manager.active_connections if conn.user_id == participant_id), None)

                # * if the participant is connected to active connections
                if participant_connection:
                    print("participant connection is true")
  
                    # userData = json.dumps({"message": f"{message}", "userId": f"{user_id}" })
                    # await manager.send_personal_message(userData, websocket)
                    
                    # ! treat sender as a participant, that way you can search by participants (all users involved in chat)
                    participantData = json.dumps({"message": f"{message}", "userId": f"{user_id}" })
                    await manager.send_personal_message( participantData,  participant_connection)
                    

                    
                # if not  participant_connection: 
                #     print("there is no  participant connection")
                #     print("add  participant connection")
                #     await manager.send_personal_message(" participant is currently unavailable.", websocket)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")

# ************** WEB SOCKETS above ********************

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

@api_app.post("/token",  response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    print("YOU ARE HITTING THE LOGIN ROUTE /token")
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

# @api_app.get("/users/", response_model=list[UserBase])
# # def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(oauth2_scheme)):
# # def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
# # *THIS APPEARS TO BE AUTHENTICATED AND EXPECTS A TOKEN NOW
# def get_users(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
#     users = crud.get_users(db, skip=skip, limit=limit)

#     return users

# @api_app.get("/users/", response_model=list[schemas.UserBase])
# @api_app.get("/users/", response_model=list[UserSchema.UserBase])
@api_app.get("/users/", response_model=list[UserBase])
def get_users(token: Annotated[str, Depends(oauth2_scheme)], city: str = Query(None), state: str = Query(None), username: str = Query(None), skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    users = crud.get_users(db, city=city, state=state, username=username, skip=skip, limit=limit)

    return users


# * get /users/{username} 
# * returns one specific user
# * NOTE THAT YOU CANNOT HAVE BOTH users/{user_id} and users/{username} as it cannot tell the differnce. 

# @api_app.get("/users/{derby_name}", response_model=UserBase)
# @api_app.get("/users/{username}", response_model=UserDetailsPublic)
# # ! Note: this allows us to get user information that is public information not private information so private information is not being sent back and forth through the api.

# # todo: this is not working when the user does not have other data that is optional in it
# def get_user(token: Annotated[str, Depends(oauth2_scheme)], username: str, db: Session = Depends(get_db)):
    
#     user = crud.get_user_by_username(db, username=username)
    
#     if username is None: 
#         raise HTTPException(status_code=404, detail=f"User with derby name {username} not found.")
    
#     return user

# * get /users/{userId} 
# * returns one specific user

# @api_app.get("/users/{derby_name}", response_model=schemas.UserBase)
@api_app.get("/users/{user_id}", response_model=UserDetailsPublic)
# ! Note: this allows us to get user information that is public information not private information so private information is not being sent back and forth through the api.

# todo: this is not working when the user does not have other data that is optional in it
def get_user(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db)):
    print("YOU ARE HITTING THE /users/{user_id} ROUTE")
    
    # user = crud.get_user_by_username(db, username=username)
    # ! organized crud files 
    # user = get_user_by_id(db, user_id=user_id)
    # ! with one crud file 
    user = crud.get_user_by_id(db, user_id=user_id)
    
    if user_id is None: 
        raise HTTPException(status_code=404, detail=f"User with derby name {user_id} not found.")
    
    return user

# * get /login/{user_id} 
# * returns one specific user by user_id

@api_app.get("/login/{user_id}", response_model=UserDetailsPrivate)
# @api_app.get("/login/{user_id}", response_model=UserBase)
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

@api_app.post("/users/", response_model=UserBase)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    
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

@api_app.put("/users/{user_id}", response_model=UserUpdate)
def update_user(token: Annotated[str, Depends(oauth2_scheme)], user: UserUpdate, ruleset: list[Ruleset], position: list[Position], insurance: list[Insurance], location: Location, user_id: int, db: Session = Depends(get_db)):
    print("!!!! INSURANCE IN MAIN.PY !!!! ", insurance)
    # ! location_id is 0 here 
    
    
    print("**** ruleset ****:", ruleset)
    
    existing_location = crud.get_location(db=db, location=location)
    
    if existing_location: 
        location_id = existing_location.location_id 
    else: 
        location_id = crud.create_location(db=db, location=location)
        print("**************** location_id in main.py***********", location_id)
    
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

# @api_app.put("/users/{user_id}", response_model=UserUpdate)
# def update_user(user: UserUpdate, user_id: int, db: Session = Depends(get_db)):
    
#     print('user in /users/{user_id}', user)
    
#     db_user = crud.get_user_by_id(db, user_id=user_id)    
 
#     if not db_user:
#         raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
#     return crud.update_user(db=db, user=user, user_id=user_id)



# * delete /users/{user_id} 
# * deletes an existing user 
# ! WILL HAVE TO VERIFY THAT THE TOKEN MATCHES THE USER THAT YOU ARE TRYING TO DELETE 
# ! WILL ALSO NEED A FORM TO SUBMIT PASSWORD AND WILL HAVE TO CHECK THAT AGAINST THE db_user
@api_app.delete("/users/{user_id}", response_model=UserDelete)
def delete_user(token: Annotated[str, Depends(oauth2_scheme)], user: UserDelete, user_id: int, db: Session = Depends(get_db)):
# def delete_user(user: schemas.UserDelete, user_id: int, db: Session = Depends(get_db)):
    
    db_user = crud.get_user_by_id(db, user_id=user.user_id)      
    
 
    if not db_user:
        raise HTTPException(status_code=400, detail=f"User with id {user_id} doesn't exist.")
    
    crud.delete_user(db=db, user=user, user_id=user.user_id)
    return { "user_id": 0, "password": "deleted"}
    


#  **** Event routes *** 

# * get /events/ 
# * returns all events  

@api_app.get("/events/", response_model=list[EventBase])
def get_events(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

# * get /events/{event_type} 
# * returns all events that match query by type, dates and city and/or state

@api_app.get("/events/{type}", response_model=list[EventBase])
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

@api_app.get("/bouts/", response_model=list[Bout])
def get_bouts(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bouts = crud.get_bouts(db, skip=skip, limit=limit)
    return bouts

# * get /bouts/{event_id} 
# * returns one bout 

@api_app.get("/bouts/{event_id}", response_model=Bout)
def get_bout(token: Annotated[str, Depends(oauth2_scheme)], event_id: int, db: Session = Depends(get_db)):
    
    bout = crud.get_bout_by_id(db, event_id=event_id)
    
    if event_id is None: 
        raise HTTPException(status_code=404, detail=f"Bout with event id {event_id} not found.")
    
    return bout

# * get /mixers/ 
# * returns all mixers

@api_app.get("/mixers/", response_model=list[Mixer])
def get_mixers(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    mixers = crud.get_mixers(db, skip=skip, limit=limit)
    return mixers

# * get /mixers/{event_id} 
# * returns one mixer 

@api_app.get("/mixers/{event_id}", response_model=Mixer)
def get_mixer(token: Annotated[str, Depends(oauth2_scheme)], event_id: int, db: Session = Depends(get_db)):
    
    mixer = crud.get_mixer_by_id(db, event_id=event_id)
    
    if event_id is None: 
        raise HTTPException(status_code=404, detail=f"Mixer with event id {event_id} not found.")
    
    return mixer
# * post /bouts/ 
# * creates a new bout 
# !  working post bout without address field
# @api_app.post("/bouts/", response_model=EventBase)
# def create_bout(bout: Bout, db: Session = Depends(get_db)):
    
    
#     print(traceback.format_exc())
#     print("you are hitting the bouts post route!!!")
#     print("****** bout *****:", bout)
#     print("****** bout.time_zone *****:", bout.time_zone)
#     print("****** type bout.time_zone *****:", type(bout.time_zone))
   
#     return crud.create_bout(db=db, bout=bout)

# ! trial for posting bout information with an address
@api_app.post("/bouts/", response_model=EventBase)
def create_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: Bout, address: Address, db: Session = Depends(get_db)):
    
    print("!!!! bout !!!! in main.py STARTING OUT", bout)
    
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

# @api_app.middleware("http")
# async def log_requests(request: Request, call_next):
#     response = await call_next(request)
#     print(f"Request: {request}")
#     print(f"Response: {response}")
#     return response

# @api_app.post("/testing")
# def create_bout(bout: Any):
    
#     print("!!!! bout !!!! in main.py testing", bout)
  
#     return bout

# @api_app.post("/testing/")
# # async def receive_data(request: Request):
# async def receive_data(bout: dict):
#     print("bout in testing:", bout)
#     return JSONResponse({"Received": bout})
# todo *****************************************************************************

# @api_app.post("/testing/")
# async def receive_data(request: Request):
#     print("bout in testing:", request)
#     json_data = await request.json()
#     print(f"/ got: {json_data}")
#     # Generating an actual JSONResponse to avoid default_response_class
#     return JSONResponse({"Received": json_data})

# todo *****************************************************************************
    
    # existing_address = crud.get_address(db=db, address=address)
    
    # if existing_address: 
    #     address_id = existing_address.address_id
    # else:
    #     address_id = crud.create_address(db=db, address=address)

    # bout.address_id = address_id
    # existing_bout = crud.get_bout_by_address_date_time_team_opposing_team(db=db, bout=bout)

    # if existing_bout: 
    #     raise HTTPException(status_code=409, detail=f"Bout already exists at the same address, on the same date, at the same time, and with the same teams.")
   
    # print("!!!! bout !!!! in main.py", bout)
    # return bout

# * post /mixers/ 
# * creates a new mixer

# @api_app.post("/mixers/", response_model=EventBase)
# def create_mixer(mixer: Mixer, db: Session = Depends(get_db)):
    
#     return crud.create_mixer(db=db, mixer=mixer)

# * post /mixers/ 
# * creates a new mixer with address 

@api_app.post("/mixers/", response_model=EventBase)
def create_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: Mixer, address: Address, db: Session = Depends(get_db)):
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

@api_app.put("/bouts/{event_id}", response_model=BoutUpdate)
def update_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: BoutUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /bouts/{event_id}', bout)
    
    db_bout = crud.get_bout_by_id(db, event_id=event_id)    
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud.update_bout(db=db, bout=bout, event_id=event_id)

# * put /mixers/{event_id} 
# * updates an existing mixer 

@api_app.put("/mixers/{event_id}", response_model=MixerUpdate)
def update_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: MixerUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /mixers/{event_id}', mixer)
    
    db_mixer = crud.get_mixer_by_id(db, event_id=event_id)    
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud.update_mixer(db=db, mixer=mixer, event_id=event_id)

# * delete /bouts/{event_id} 
# * deletes an existing bout
# ! note you may have to add some security measures on this

@api_app.delete("/bouts/{event_id}", response_model=EventDelete)
def delete_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: EventDelete, event_id: int, db: Session = Depends(get_db)):
    
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

@api_app.delete("/mixers/{event_id}", response_model=EventDelete)
def delete_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: EventDelete, event_id: int, db: Session = Depends(get_db)):
    
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

@api_app.post("/address/", response_model=Address)
def create_address(token: Annotated[str, Depends(oauth2_scheme)], address: Address, db: Session = Depends(get_db)):
    
    print("address is getting hit:")
    
    return crud.create_address(db=db, address=address)

# * get /address/ 
# * gets all addresses 

@api_app.get("/address/", response_model=list[Address])
def get_addresses(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_addresses(db, skip=skip, limit=limit)

# * get /address/{address_id} 
# * gets one address by id

@api_app.get("/address/{address_id}", response_model=Address)
def get_address(token: Annotated[str, Depends(oauth2_scheme)], address_id:int, db: Session = Depends(get_db)):
    
    return crud.get_address_by_id(db, address_id=address_id)

#  **** ruleset routes ***

# * get /user/ruleset/ 
# * gets all user rulesets 

@api_app.get("/user/ruleset/", response_model=list[UserRuleset])
def get_users_rulesets(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud.get_user_ruleset(db, skip=skip, limit=limit)
# * get /rulesets/ 
# * gets all rulesets 

@api_app.get("/rulesets/", response_model=list[Ruleset])
def get_rulesets(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_rulesets(db, skip=skip, limit=limit)

# * get /rulesets/{ruleset_id} 
# * gets one ruleset by id

@api_app.get("/rulesets/{ruleset_id}", response_model=Ruleset)
def get_ruleset(token: Annotated[str, Depends(oauth2_scheme)], ruleset_id:int, db: Session = Depends(get_db)):
    
    return crud.get_ruleset_by_id(db, ruleset_id=ruleset_id)

#  **** position routes ***

# * get /user/position/ 
# * gets all user positions 

@api_app.get("/user/position/", response_model=list[UserPosition])
def get_users_positions(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud.get_user_position(db, skip=skip, limit=limit)

# * get /positions/ 
# * gets all positions 

@api_app.get("/positions/", response_model=list[Position])
def get_positions(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_positions(db, skip=skip, limit=limit)
    
# * get /positions/{position_id} 
# * gets one position by id

@api_app.get("/positions/{position_id}", response_model=Position)
def get_position(token: Annotated[str, Depends(oauth2_scheme)], position_id:int, db: Session = Depends(get_db)):
    
    return crud.get_position_by_id(db, position_id=position_id)

#  **** insurance routes ***

# * get /user/insurance/ 
# * gets all user positions 

@api_app.get("/user/insurance/", response_model=list[UserInsurance])
def get_users_insurance(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud.get_user_insurance(db, skip=skip, limit=limit)

# * get /insurances/ 
# * gets all insurance

@api_app.get("/insurance/", response_model=list[Insurance])
def get_insurances(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_insurances(db, skip=skip, limit=limit)
    
# * get /insurances/{insurance_id} 
# * gets one insurance by id

# @api_app.get("/insurances/{insurance_id}", response_model=schemas.Insurance)
@api_app.get("/insurances/{insurance_id}", response_model=InsuranceOutput)
def get_insurance(token: Annotated[str, Depends(oauth2_scheme)], insurance_id:int, db: Session = Depends(get_db)):
    
    return crud.get_insurance_by_id(db, insurance_id=insurance_id)

#  **** location routes ***

# * get /locations/ 
# * gets all locations 

@api_app.get("/locations/", response_model=list[Location])
def get_locations(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud.get_locations(db, skip=skip, limit=limit)
    
# * get /locations/{location_id} 
# * gets one location by id

@api_app.get("/locations/{location_id}", response_model=Location)
def get_location(token: Annotated[str, Depends(oauth2_scheme)], location_id:int, db: Session = Depends(get_db)):
    
    return crud.get_location_by_id(db, location_id=location_id)

#  **** message routes ***
# ! note may not need to use these at all 

# * get /messages/users
# * gets all messages and users
# todo this does not work but may not be necessary 
@api_app.get("/messages/users", response_model=list[Message])
# @api_app.get("/messages/users", response_model=list[MessageWithUser])
def get_messages_with_users(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /messages in main.py")
    data = crud.get_messages_with_user_ids(db, skip=skip, limit=limit)
    print("data[0] in /messages", data[0])
    print("data[0].message_id in /messages", data[0].message_id)
    print("data[0].message in /messages", data[0].message)
    print("data[0].date_time in /messages", data[0].date_time)
    print("data[0].user in /messages", data[0].user)
    print("data[0].user[0] in /messages", dir(data[0].user[0]))
    print("data[0].user[0].user_id in /messages", data[0].user[0].user_id)
    return data

# # * get /user/message
# # * gets all user messages

# @api_app.get("/user/message", response_model=list[schemas.UserMessage])
# def get_messages(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     print("hitting /messages in main.py")
#     return crud.get_user_message(db, skip=skip, limit=limit)

# * get /user/message
# * gets all user messages

# @api_app.get("/user/message/", response_model=list[MessageObject])
@api_app.get("/user/message/")
def get_messages(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /user/messages in main.py")
    # return crud.get_user_message(db, skip=skip, limit=limit)
    return crud.get_chat_history(db, participant_ids=[1, 3])
    # return crud.get_chat_history(db)

# * get /history
# * gets chat history

@api_app.get("/history/{participant_ids}")
def get_messages(token: Annotated[str, Depends(oauth2_scheme)], participant_ids: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /history in main.py")
    print("! !!!!!!!!!!!!!!!!!!!!!!!participant ids in main.py", participant_ids)
    
    participant_ids_list = sorted( participant_ids.split(","))
    
    print("participant_ids_list !!!!!!!!!!!!!!!!!!!!!!!!!!!!", participant_ids_list)
    
    db_group = crud.get_group_id_by_participants(db, participant_ids=participant_ids_list)
    
    print("what is the group_id in main.py ??????????????????", db_group)
    
    db_chat = crud.get_chat_by_group_id(db, group_id=db_group.group_id)
    
    db_messages = crud.get_messages_by_chat_id(db, chat_id=db_chat.chat_id)
    
    print("db messages in /history/{participants_ids}:", db_messages)

    return db_messages

# * get /messages 
# * gets all messages 

@api_app.get("/messages", response_model=list[Message])
def get_messages(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /messages in main.py")
    return crud.get_messages(db, skip=skip, limit=limit)

# * get /chats/{user_id}
# * gets all chats by user_id 

@api_app.get("/chats/{user_id}", response_model=list[ChatObject])
def get_chats(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db)):
    print("hitting /chats in main.py")
    
    groups_db = crud.get_groups_by_participant(db=db, user_id=user_id)
    print("groups db in main.py:", groups_db)
    # for group_id in groups_db.group_id
    group_ids = [group.group_id for group in groups_db]
    print("group_ids in main.py:", group_ids)
    
    chats_db = crud.get_chats_by_group_ids(db=db, group_ids=group_ids)

    return chats_db


# * delete /messages/{message_id} 
# * deletes an existing message

# @api_app.delete("/messages/{message_id}", response_model=MessageDelete)
# def delete_message(token: Annotated[str, Depends(oauth2_scheme)], message: MessageDelete, message_id: int, db: Session = Depends(get_db)):
    
#     print('message in /messages/{message_id}', message)
#     user = crud.get_user_by_id(db, user_id=user_id)
#     db_message = crud.get_message_by_id(db, message_id=message_id)   
#     print("db_message:", db_message)   
#     print("db_message.message_id:", db_message.message_id)   
    
 
#     if not db_message:
#         raise HTTPException(status_code=400, detail=f"Message with id {message_id} doesn't exist.")
    
#     return crud.delete_message(db=db, message_id=db_message.message_id)


# ! for testing only 

@api_app.get("/chat/test/")
def get_chats_testing(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    print("hitting /chat/test/group_ids in main.py")
    group_ids = [3]
    # return crud.get_user_message(db, skip=skip, limit=limit)
    
        
    # groups_db = crud.get_groups_by_participant(db=db, user_id=user_id)
    # print("groups db in main.py:", groups_db)
    # # for group_id in groups_db.group_id
    # group_ids = [group.group_id for group in groups_db]
    # print("group_ids in main.py:", group_ids)
    
    # chats_db = crud.get_chats_by_group_ids(db=db, group_ids=group_ids)
    
    chats_db = crud.get_chats_by_group_ids(db=db, group_ids=group_ids)
    
    return chats_db















# ****************************************************

@api_app.get("/json")
async def kenobi():
    return {"hello_there": "general kenobi"}

class UserPost(BaseModel): 
    username: str
    password: str
    email: str
    user_id: int

@api_app.post("/userstest")
async def receive_data(users: UserPost):
# async def receive_data(users: UserPost):
    print("users", users)
   
    # Generating an actual JSONResponse to avoid default_response_class
    return users

# @api_app.get("/")
# async def get():
#     print("HITTING GET REQUESTS")
#     return HTMLResponse(html)

@api_app.get("/blah")
async def get_blah():
    return {"messageTest": "blah blah"}

