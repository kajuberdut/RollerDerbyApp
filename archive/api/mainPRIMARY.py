
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

from . import socket_manager
# # ****

# # from sockets import sio_app 

# # from . import sockets as sio_app 
# # from . import sockets
# # not sure if this is right but its definitely should be importing from sockets.py so that is correct. 

# # from sockets import sio

# # from fastapi_socketio import SocketManager
# # from fastapi.responses import HTMLResponse
#  # * imports for socket.io


https://www.youtube.com/playlist?list=PL0Zuz27SZ-6NOkbTDxKi7grs_oxJhLu07


import traceback
from ...api.src import crud, models, schemas

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


from ...api.src.database import SessionLocal, engine, create_all_tables

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




