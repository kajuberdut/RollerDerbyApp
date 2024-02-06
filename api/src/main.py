from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os
from os import path
import logging

from . import models

from .schemas.address_schema import *
from .schemas.chat_schema import *
from .schemas.event_schema import *
from .schemas.group_schema import *
from .schemas.insurance_schema import *
from .schemas.location_schema import *
from .schemas.message_schema import *
from .schemas.position_schema import *
from .schemas.ruleset_schema import *
from .schemas.team_invite_schema import *
from .schemas.token_schema import *
from .schemas.user_schema import *

from .crud.address_crud import *
from .crud.chat_crud import *
from .crud.event_crud import *
from .crud.group_crud import *
from .crud.insurance_crud import *
from .crud.location_crud import *
from .crud.message_crud import *
from .crud.position_crud import *
from .crud.ruleset_crud import *
# from .crud.team_crud import *
from .crud.team_invite_crud import *
from .crud.user_crud import *

from .routers import address_router
from .routers import authentication_router
from .routers import chat_router
from .routers import event_router
from .routers import group_router
from .routers import insurance_router
from .routers import location_router
from .routers import message_router
from .routers import position_router
from .routers import ruleset_router
from .routers import team_router
from .routers import team_invite_router
from .routers import user_router
from .routers import websocket_router

from fastapi.staticfiles import StaticFiles

from .database import engine, create_all_tables

# # ? imports for incase from patrick
from incase.middleware import JSONCaseTranslatorMiddleware, CamelJsonResponse
# # ? imports for incase from patrick


print("engine in main.py:", engine)

print("main.py is running")

create_all_tables()

models.SQLAlchemyBase.metadata.create_all(bind=engine)

api_app = FastAPI()

# ?everything  below is for incase patrick middle *****************************
api_app = FastAPI(default_response_class=CamelJsonResponse)
api_app.add_middleware(JSONCaseTranslatorMiddleware, handle_response=False)
# ?everything  below is for incase patrick middle *****************************

# * routes in sub-directory 

api_app.include_router(address_router.router)
api_app.include_router(authentication_router.router)
api_app.include_router(chat_router.router)
api_app.include_router(event_router.router)
api_app.include_router(group_router.router)
api_app.include_router(insurance_router.router)
api_app.include_router(location_router.router)
api_app.include_router(message_router.router)
api_app.include_router(position_router.router)
api_app.include_router(ruleset_router.router)
api_app.include_router(team_router.router)
api_app.include_router(team_invite_router.router)
api_app.include_router(user_router.router)
api_app.include_router(websocket_router.router)

# api_app.mount("/static", StaticFiles(directory="static_files"))
# api_app.mount("/static_files", StaticFiles(directory="./static_files"))
# BASE_DIR = Path().resolve().parent

# api_app.mount("/static", StaticFiles(directory="static"), name="static")
# api_app.mount('/static', StaticFiles(directory=os.path.join('../src', 'static')), name='static')

# print("api_app,routes", api_app.routes)

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# path_str = path.dirname(path.realpath(__file__))
# print("***********************************************************")
# logger.info("relative path of static folder: %s", path_str)
# print("logger.info('relative path of static folder: %s', path_str)", path_str)
# print("*****************************************************")

api_app.mount("/static", StaticFiles(directory="/home/kicamsmm/Springboard_Recent/Springboard/Capstone2/api/src/static"), name="static")


origins = [
    "http://localhost/3000",
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


        
        
