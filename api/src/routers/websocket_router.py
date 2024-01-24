from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db, hash_password, get_and_validate_current_user
import json

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *
from ..crud.user_crud import *

router = APIRouter()

# router = APIRouter(
#     prefix="/ws",
#     tags=["websocket"],
# )

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        print("!! ! self.active_connectiosn", self.active_connections)
    
    # * connect this user the logged in user to the websocket active_connections list
    async def connect(self, websocket: WebSocket, user_id: int):
        print("In connect in webSocket_router.py the user_id:", user_id)
        await websocket.accept()
        websocket.user_id = user_id 
        self.active_connections.append(websocket)
        # new user comes to our connection then added to the list of active_connections

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        # This is disconnecting them from that connection

    async def send_personal_message(self, message: str, websocket: WebSocket):
        print("hitting send_personal_message")
        print("message in websocket router send_personal message:", message)
        await websocket.send_text(message)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

    
manager = ConnectionManager()

@router.websocket("/ws/{user_id}")
# @router.websocket("/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    print(" ^^^^^^^^^websocket is running /ws/{user_id} ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    
    #  connect to websocket
    await manager.connect(websocket, user_id)
     
    try: 
        while True:

            data = await websocket.receive_text()

            # turn data into a dict 
            data_dict = json.loads(data)

            if "first_message" in data_dict:
                
                # validate token and return user associated with tokem
                user = await get_and_validate_current_user(db, data_dict["token"])
                print("user:", user)
   
                if user:
                    
                    print("**************************************")
                    print("Token is valid.")
                    print("**************************************")

                    # if route is authenticated move to next loop (will be next sent message)
                    continue
                    
                else:
                    
                    print("token invalidd")
                    manager.disconnect(websocket)              
            
            message_id = data_dict["messageId"]
            message = data_dict["message"]
            sender_id = data_dict["senderId"]
            sender_username = data_dict["senderUsername"]
            participant_ids = sorted(data_dict["participantIds"])
                
            date_time = data_dict["dateTime"]
            chat_id = data_dict["chatId"]
            
            # ! not that this is to handle the two user chats
            participant_names = []
            
            for participant_id in participant_ids: 
                participant = crud_get_user_by_id(db=db, user_id=participant_id)
                participant_names.append(participant.username)
                
            
            if chat_id == 0:

                group_db = crud_get_group_id_by_participants(db=db, participant_ids=participant_ids)
                
                if not group_db:
                    
                    group = {
                        "participant_ids": participant_ids,
                        "name": f"{participant_names[0]} & {participant_names[1]}"
                    }
                    
                    group_db = crud_create_group(db=db, group=group)
                    
                    for participant_id in participant_ids: 
                        
                        # ensures user exists 
                        user_db = crud_get_user_by_id(db=db, user_id=participant_id)
                            
                        if user_db: 
                            user_group = {
                                "user_id": participant_id,
                                "group_id": group_db.group_id
                            }
                            user_group_db = crud_add_user_to_group(db=db, user_group=user_group)
                            
                if group_db: 
                    chat_db = crud_get_chat_by_group_id(db=db, group_id=group_db.group_id)       
                    # ! not sure if this is indented properly
                    
                    if not chat_db: 
                        chat = {
                            "group_id": group_db.group_id
                        }
                        
                        chat_db = crud_create_chat(db=db, chat=chat)
                    
                    chat_id = chat_db.chat_id
                
            new_message = {
                "chat_id": chat_id,
                "message": message, 
                "date_time": date_time,
                "sender_username": sender_username,
                "sender_id": sender_id
            }     
            
            db_message_id = crud_create_message(db=db, message=new_message)
            
            
            for participant_id in participant_ids:                
                
                participant_connection = next((conn for conn in manager.active_connections if conn.user_id == participant_id), None)
                        
                
                if participant_connection is None: 
                    continue

                            
                # * if the participant is connected to active connections
                if participant_connection:
                    
                    participantData = json.dumps({"message": f"{message}", "userId": f"{sender_id}", "senderUsername": f"{sender_username}", "messageId": f"{db_message_id}" })
                    
                    await manager.send_personal_message( participantData,  participant_connection)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        
        # * not you are not printing this on the frontend but could add in a green light if user is connected 
        await manager.broadcast({"disconnected":f"User Id #{user_id} has left the chat" })
