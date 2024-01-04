from fastapi import FastAPI, Depends, FastAPI, HTTPException, status, Query, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import traceback
from . import crud, models, schemas
from .database import SessionLocal, engine, create_all_tables


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

# api_app = FastAPI()

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
        


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        print("test this ")
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        # new user comes to our connection then added to the list of active_connections

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        # This is disconnecting them from that connection

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    
manager = ConnectionManager()

@api_app.get("/json")
async def kenobi():
    return {"hello_there": "general kenobi"}

class UserPost(BaseModel): 
    username: str
    password: str
    email: str
    user_id: int

@api_app.post("/users")
async def receive_data(users: UserPost):
# async def receive_data(users: UserPost):
    print("users", users)
   
    # Generating an actual JSONResponse to avoid default_response_class
    return users

@api_app.get("/")
async def get():
    print("HITTING GET REQUESTS")
    return HTMLResponse(html)

@api_app.get("/blah")
async def get_blah():
    return {"messageTest": "blah blah"}

@api_app.websocket("/ws/{user_id}")
# @api_app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    print("websocket is running /ws/{user_id}")
    await manager.connect(websocket)
    try: 
        while True:
            data = await websocket.receive_text()
            print("data in main.py:", data)
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"User Id {user_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")
