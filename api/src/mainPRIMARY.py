
# ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ THIS IS MY CODE BELOW ~~~~~~~~~~~~~~~~~~~~ PATRICKS ABOVE ~~~~

# ***  YOUR IMPORTS ***
from fastapi import Depends, FastAPI, HTTPException, status, Query, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
# ***  YOUR IMPORTS ***

# # ? imports for incase from patrick
# from fastapi.requests import Request
# from fastapi.responses import JSONResponse, HTMLResponse
# from incase.middleware import JSONCaseTranslatorMiddleware, CamelJsonResponse
# # ? imports for incase from patrick

# # # * imports for socket.io

# # ! I THINK THE ERROR YOU ARE GETTING IS FROM THIS 
# import socketio
# # from . import sockets
from fastapi_socketio import SocketManager
# # ****

# # from sockets import sio_app 

# # from . import sockets as sio_app 
# # from . import sockets
# # not sure if this is right but its definitely should be importing from sockets.py so that is correct. 

# # from sockets import sio

# # from fastapi_socketio import SocketManager
# # from fastapi.responses import HTMLResponse
#  # * imports for socket.io





import traceback
from . import crud, models, schemas, socket_manager

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


from .database import SessionLocal, engine, create_all_tables

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

# **** socket.io *****************************
sio = SocketManager(app=api_app)



# **** socket.io *****************************

# ! mount socket io
sio.attach("/socket.io", app=api_app)
# sio_app = socketio.ASGIApp(sockets)
# api_app.mount('/', app=sio_app)


# api_app.mount('/sockets', sio_app)
# mount socket io on / path 

# socket_manager = SocketManager(app=api_app)
# ! mount socket io


# ?everything  below is for incase patrick middle *****************************

# api_app = FastAPI(default_response_class=CamelJsonResponse)
# api_app.add_middleware(JSONCaseTranslatorMiddleware, handle_response=False)

# ?everything  below is for incase patrick middle *****************************



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
        
       
       

#  todo **** socket.io routes *****

@api_app.sio.on('join')
async def handle_join(sid, *args, **kwargs):
    await sio.emit('lobby', 'User joined')


@api_app.sio.on('socket')
async def test(sid, *args, **kwargs):
    await sio.emit('hey', 'joe')



#  todo **** socket.io routes ***** 
        
# # * post /test/ 
# # * test post with in case 

# @api_app.post("/test/")
# def create_user(user: dict):
    
#     print("user in test !!!!!!!!!!!!!!!!!!!!!!!!!!", user)

#     return user



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

#  **** Socket.io routes *** 

# html = ""
# with open('index.html', 'r') as f:
#     html = f.read()

@api_app.get("/")
def home():
    

    return {'message': 'Hello Derby Players'}

# @api_app.get("/")
# async def get():
#     return HTMLResponse(html)

# https://medium.com/@pranata.giya12.gp/develop-a-chat-application-using-react-js-fastapi-and-websocket-5660143c4f80

# class ConnectionManager:
#     def __init__(self):
#         self.active_connections: List[WebSocket] = []

#     async def connect(self, websocket: WebSocket):
#         await websocket.accept()
#         self.active_connections.append(websocket)

#     def disconnect(self, websocket: WebSocket):
#         self.active_connections.remove(websocket)

#     async def send_personal_message(self, message: str, websocket: WebSocket):
#         await websocket.send_text(message)

#     async def broadcast(self, message: str):
#         for connection in self.active_connections:
#             await connection.send_text(message)


# manager = ConnectionManager()

# @api_app.get("/")
# def home():
    

#     return {'message': 'Hello Derby Players'}

# @api_app.websocket("/ws/{client_id}")
# async def websocket_endpoint(websocket: WebSocket, client_id: int):
#     await manager.connect(websocket)
#     now = datetime.now()
#     current_time = now.strftime("%H:%M")
#     try:
#         while True:
#             data = await websocket.receive_text()
#             # await manager.send_personal_message(f"You wrote: {data}", websocket)
#             message = {"time":current_time,"clientId":client_id,"message":data}
#             await manager.broadcast(json.dumps(message))
            
#     except WebSocketDisconnect:
#         manager.disconnect(websocket)
#         message = {"time":current_time,"clientId":client_id,"message":"Offline"}
#         await manager.broadcast(json.dumps(message))





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



# ************************************** INCASE BASIC ROUTES TO TRY AND DEBUG IGNORING FOR NOW **********************

# from fastapi import FastAPI
# from fastapi.requests import Request
# from fastapi.responses import JSONResponse, HTMLResponse
# from incase.middleware import JSONCaseTranslatorMiddleware, CamelJsonResponse
# import logging
# # from . import schemas
# from pydantic import BaseModel




# logging.basicConfig(level=logging.DEBUG)

# api_app = FastAPI(default_response_class=CamelJsonResponse)

# api_app.add_middleware(JSONCaseTranslatorMiddleware, handle_response=False)

# class Test(BaseModel): 
#     info: str


# @api_app.get("/")
# def read_root():
#     return HTMLResponse("""
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <title>JSON Submission Form</title>
#     <style>
#         body {
#             font-family: Arial, sans-serif;
#             background-color: #f4f4f4;
#             margin: 0;
#             padding: 20px;
#             display: flex;
#             flex-direction: column;
#             align-items: center;
#             justify-content: center;
#             height: 100vh;
#         }

#         h1 {
#             color: #333;
#         }

#         textarea {
#             width: 80%;
#             max-width: 500px;
#             margin-bottom: 10px;
#             padding: 10px;
#             border: 1px solid #ddd;
#             border-radius: 4px;
#             font-size: 16px;
#             resize: vertical;
#         }

#         button {
#             padding: 10px 20px;
#             background-color: #007bff;
#             color: white;
#             border: none;
#             border-radius: 4px;
#             cursor: pointer;
#             font-size: 16px;
#         }

#         button:hover {
#             background-color: #0056b3;
#         }

#         pre {
#             width: 80%;
#             max-width: 500px;
#             background-color: #fff;
#             border: 1px solid #ddd;
#             padding: 10px;
#             border-radius: 4px;
#             overflow-x: auto;
#         }
#     </style>
#     <script>
#         function submitJSON() {
#             var jsonInput = document.getElementById("jsonInput").value;
#             var xhr = new XMLHttpRequest();
#             xhr.open("POST", "http://localhost:8000/json", true);
#             xhr.setRequestHeader("Content-Type", "application/json");

#             xhr.onload = function () {
#                 if (xhr.status === 200) {
#                     var response = JSON.parse(xhr.responseText);
#                     document.getElementById("response").textContent = JSON.stringify(response, null, 2);
#                 } else {
#                     console.error("Error in request: " + xhr.status);
#                 }
#             };

#             xhr.onerror = function () {
#                 console.error("Request error...");
#             };

#             xhr.send(jsonInput);
#         }
#     </script>
# </head>
# <body>
#     <h1>JSON Submission Form</h1>
#     <textarea id="jsonInput" rows="10" cols="50" placeholder="Enter JSON here"></textarea>
#     <br>
#     <button onclick="submitJSON()">Submit</button>
#     <pre id="response"></pre>
# </body>
# </html>

# """)

# @api_app.get("/json")
# async def kenobi():
#     return {"hello_there": "general kenobi"}

# @api_app.post("/json")
# async def receive_data(request: Request):
#     json_data = await request.json()
#     print(f"/ got: {json_data}")
#     # Generating an actual JSONResponse to avoid default_response_class
#     return JSONResponse({"Received": json_data})


# @api_app.post("/test")
# async def receive_data(user: dict):
#     print(f"/ got: {user}")
#     return user

# @api_app.post("/test")
# async def receive_data(request: Request):
#     user = await request.body()
#     print(f"/ got: {user}")
#     return user

# @api_app.post("/test")
# async def receive_data(user: dict):
#     logging.debug("Received user: %s", user)
#     return user


# @api_app.post("/test")
# async def receive_data(info):
#     raise ValueError("/test is being called")
#     return {"message": "Route reached successfully!"}

# @api_app.post("/test")
# async def receive_data(request: Request):
#     print("request:", request)
#     return request

# @api_app.post("/test")
# async def receive_data(request: Request):
#     print("request:", request)
#     print("request.method:", request.method)  # Output: GET or POST, etc.
#     print("request.headers:", request.headers)  # Output: HTTP headers
#     print("request.url:", request.url)      # Output: Request URL
#     print("await request.body():", await request.body())  # Output: Request body (if applicable)

#     return {"message": "Route reached successfully!"}

# class UserPost(BaseModel): 
#     username: str
#     password: str
#     email: str
#     user_id: int

# @api_app.post("/users")
# # async def receive_data(users: schemas.UserPost):
# async def receive_data(users: UserPost):
#     print("users", users)
   
#     # Generating an actual JSONResponse to avoid default_response_class
#     return users


# ! Ones below this are working !!!!
# @api_app.post("/test")
# async def receive_data():
#     raise ValueError("/test is being called")
#     return {"message": "Route reached successfully!"}


# @api_app.post("/test")
# async def receive_data(request: Request):
#     raise ValueError("/test is being called", request)
#     return {"message": "Route reached successfully!"}


# @api_app.post("/test")
# async def receive_data(request: Request):
#     print("request:", request)
#     print("request.method:", request.method)  
#     print("request.headers:", request.headers)  
#     print("request.url:", request.url)    
#     # ! THIS LINE IS BREAKING THE CODE
#     # print("await request.body():", await request.body())  
#     print("request.body():", request.body())  

#     return {"message": "Route reached successfully!"}

# @api_app.post("/test")
# async def receive_data(test: Test):
#     print("test:", test)
    

#     return {"message": "Route reached successfully!"}




# @api_app.post("/test")
# async def receive_data(request: Request):
#     print("request:", request)

#     return {"message": "Route reached successfully!"}




