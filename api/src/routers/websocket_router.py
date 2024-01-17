from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db, hash_password
import json

# from ..schemas.user_schema import *
# from ..schemas.location_schema import *

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *
from ..crud.user_crud import *

# from ..crud.ruleset_crud import *

router = APIRouter()



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

@router.websocket("/ws/{user_id}")
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
            # participant_ids = data_dict["participant_ids"]
            # if participant_ids:
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
                group_db = crud_get_group_id_by_participants(db=db, participant_ids=participant_ids)
                
                if not group_db:
                    
                    group = {
                        "participant_ids": participant_ids,
                        "name": "Testing"
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
            
            
            db_message_id = crud_create_message(db=db, message=new_message)
    
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
                    print("!!!!!!!!!!!!participantData !!!!!!!!!!!!!!!:", participantData)
                    
                    await manager.send_personal_message( participantData,  participant_connection)
                    

                    
                # if not  participant_connection: 
                #     print("there is no  participant connection")
                #     print("add  participant connection")
                #     await manager.send_personal_message(" participant is currently unavailable.", websocket)
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")
