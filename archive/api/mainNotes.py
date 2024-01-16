# **** WEB SOCKETS ****

# **** chatHistory with websoockets ****

       # *** chat history ***
            # chat_history = crud.get_chat_history(db=db, participant_ids= participantt_ids)           
            # print("***************** chat_history *********************:", chat_history)
     

          # if chat_history: 
            #     for recip_id in chat_history[0]['participant_ids']:
                    
            #          participant_connection = next((conn for conn in manager.active_connections if conn.user_id == recip_id), None)
                    
            #         if participant_connection:
            #             for chat_message in chat_history: 
            #                  participantData = json.dumps({"message": f"{chat_message['message']}", "userId": f"{chat_message['sender_id']}" })
            #                 await manager.send_personal_message( participantData, participant_connection)

        # *** chat history ***




# ****  participant ids on messages ****

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

async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):

    print("websocket is running /ws/{user_id}")
    print("websocket.scope['path']:", websocket.scope["path"])
    print("user_id in main.py", user_id)
    
    await manager.connect(websocket, user_id)
    try: 
        while True:
            data = await websocket.receive_text()
            
            
            print("data in main.py:", data)
            data_dict = json.loads(data)
            print("data_dict:", data_dict)
            message_id = data_dict["messageId"]
            message = data_dict["message"]
            sender_id = data_dict["senderId"]
            participant_ids = data_dict[" participantIds"]
            date_time = data_dict["dateTime"]
            
             # *** chat history ***
            # chat_history = crud.get_chat_history(db=db, user_id=user_id,  participant_ids= participant_ids)
            # *** chat history ***
            
            # print("chat_history:", chat_history)
            # * add to message to database for user
            # ! THIS IS NOT RETURNING MY MESSAGE ID NOT SURE WHY 
            this_message = {
                "message": message, 
                "date_time": date_time,
                "message_id": 0,
            }
            db_message_id = crud.create_message(db=db, message=this_message)
    
            print("db_message_id in main.py &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", db_message_id)
            db_user_message = crud.create_user_message(db=db, sender_id=sender_id, message_id=db_message_id,  participant_ids=participant_ids)
       
     
            for  participant_id in  participant_ids:
                
                # * add to message to database for each  participant 
                # db_participant_message = crud.create_user_message(db=db, user_id=participant_id, message_id=db_message_id)
                 # * add to message to database for each participant 
                
  
                # * if there is no connection between the recipiet and the user you will need to add one
                participant_connection = next((conn for conn in manager.active_connections if conn.user_id ==  participant_id), None)
                print("participant connection:", participant_connection)
                print("participant connection.user_id:", participant_connection.user_id)
                if participant_connection:
                    print("participant connection is true")

                    userData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(userData, websocket)
     
                    participantData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(participantData, participant_connection)
              
                    
                if not participant_connection: 
                    print("there is no participant connection")
                    print("add participant connection")
                    await manager.send_personal_message("Participant is currently unavailable.", websocket)
                
        
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")


# ! ************************************* WEB SOCKET NOTES without chat ************************************

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
            participant_ids = data_dict["participantIds"]
            date_time = data_dict["dateTime"]
            
            # print("message_id", message_id )
            # print("type message_id", type(message_id))
            # print("date_time: ******", date_time)
            # print("type date_time: ******", type(date_time))
            # print("message in main.py **** ", message)
            # print("sender id in main.py ****", sender_id)
            # print("participant_id in main.py ****", participant_ids)
            # print(" ****** manager.active_connections:", manager.active_connections)
          
            # print("~~~~ manager.active_connections ~~~~:", manager.active_connections)
            # print("~~~~ manager.active_connections ~~~~:", dir(manager.active_connections))
            
             # *** chat history ***
            # chat_history = crud.get_chat_history(db=db, user_id=user_id, participant_ids=participant_ids)
            # *** chat history ***
            
            # print("chat_history:", chat_history)
            # * add to message to database for user
            # ! THIS IS NOT RETURNING MY MESSAGE ID NOT SURE WHY 
            this_message = {
                "message": message, 
                "date_time": date_time,
                "message_id": 0,
                # "participant_ids": participant_ids
            }
            db_message_id = crud.create_message(db=db, message=this_message)
            # db_message_id = crud.create_message(db=db, message_id=message_id, message=message, date_time=date_time)
            # db_message_id = crud.create_message(db=db, message=message, date_time=date_time)
            print("db_message_id in main.py &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", db_message_id)
            db_user_message = crud.create_user_message(db=db, sender_id=sender_id, message_id=db_message_id, participant_ids=participant_ids)
            # 
            print("db_user_message:", db_user_message)
            print("db_user_message.participant_ids:", db_user_message.participant_ids)
            # todo this is the line you need to work on.... 
            # participant_websocket = [ws for ws in manager.active_connections if ws.user_id == participant_id]
            for participant_id in participant_ids:
                
                # * add to message to database for each participant 
                # db_participant_message = crud.create_user_message(db=db, user_id=participant_id, message_id=db_message_id)
                 # * add to message to database for each participant 
                
                print("Handling this participant:", participant_id)
                print("Type of participant:", type(participant_id))
                # * if there is no connection between the recipiet and the user you will need to add one
                participant_connection = next((conn for conn in manager.active_connections if conn.user_id == participant_id), None)
                print("participant connection:", participant_connection)
                print("participant connection.user_id:", participant_connection.user_id)
                if participant_connection:
                    print("participant connection is true")
                    # await manager.send_personal_message(f"You wrote: {message}", websocket)
                    userData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(userData, websocket)
                    # await manager.send_personal_message(f"Message from user with id {user_id}: {message}", participant_connection)
                    
                    # await manager.send_personal_message(f"Message from user with id: {message}", participant_connection)
                    
                    # participantData = json.dumps({"message": f"{message}", "user_id": f"{participant_id}" })
                    participantData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(participantData, participant_connection)
                    # await manager.send_personal_message({ "message": f"{message}", "user_id": f"{participant_id}"}, participant_connection)
                    
                if not participant_connection: 
                    print("there is no participant connection")
                    print("add participant connection")
                    await manager.send_personal_message("participant is currently unavailable.", websocket)
                
            
            # ! if you get rid of ----- if participant_websocket 
                # ! then you will print those items in the frontend 
            
            # if participant_websocket:
            #     await manager.send_personal_message(f"You wrote: {message}", participant_websocket[0])
            #     await manager.broadcast(f"User Id {user_id} says: {message}")
                
            # await manager.send_personal_message(f"You wrote: {message}", websocket)
            # * broadcasting to all participants regaradless of whether they user_id matches the participant_id
            # await manager.broadcast(f"User Id {user_id} says: {message}")
            # else:
            #     raise Exception("no participant web socket")
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")
        
        


# !!!!!!!!!!!!!!!!!!!!!!!!!!! WITH  CHAT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
    
            data_dict = json.loads(data)
            
            print("data_dict:", data_dict)
            message_id = data_dict["messageId"]
            message = data_dict["message"]
            sender_id = data_dict["senderId"]
            date_time = data_dict["dateTime"]
            chat_id = data_dict["chatId"]
       
            
            print("message_id", message_id)
            print("date_time: ******", date_time)
            print("message in main.py **** ", message)
            print("sender id in main.py ****", sender_id)
            print("chat_id in main.py ****", chat_id)
 

            
             # *** chat history ***
            # chat_history = crud.get_chat_history(db=db, user_id=user_id, participant_ids=participantt_ids)
            # *** chat history ***
            
            # print("chat_history:", chat_history)
            # * add to message to database for user
            if chat_id == 0:
                
                type = data_dict["type"]
                group_id = data_dict["groupId"]
            
                
                print("type in main.py ****", type)
                print("group_id in main.py ****", group_id)
                
                chat = {"chat_id": chat_id, "type": type, "group_id": group_id}
                chat_id_db = crud.create_chat(db=db, chat=chat)
                print("chat_id_db", chat_id_db)
                chat_id = chat_id_db
                
            sent_message = {
                "message": message, 
                "date_time": date_time,
                "message_id": 0,
                "chat_id": chat_id
            }
            
            db_message_id = crud.create_message(db=db, message=sent_message)
        
            db_user_message = crud.create_user_message(db=db, sender_id=sender_id, message_id=db_message_id)
        
            print("db_user_message:", db_user_message)

            db_chat = crud.get_chat_by_id(db=db, chat_id=sent_message['chat_id'])
            
            type = db_chat.type 
            group_id = db_chat.group_id
            # db_chat_id =db_chat.chat_id
            
            if type == "user": 
                participant_connection = next((conn for conn in manager.active_connections if conn.user_id == group_id), None)
                print("!!!!!!!!!!!!! participant_connection:", participant_connection)
                print("!!!!!!!!!!!!! participant_connection.:", participant_connection.user_id)
                
                
                if participant_connection:
                    print("participant connection is true")
                    # await manager.send_personal_message(f"You wrote: {message}", websocket)
                    userData = json.dumps({"message": f"{message}", "userId": f"{user_id}", "chatId": f"{chat_id}" })
                    await manager.send_personal_message(userData, websocket)
                    # await manager.send_personal_message(f"Message from user with id {user_id}: {message}", participant_connection)
                    
                    # await manager.send_personal_message(f"Message from user with id: {message}", participant_connection)
                    
                    # participantData = json.dumps({"message": f"{message}", "user_id": f"{participant_id}" })
                    participantData = json.dumps({"message": f"{message}", "userId": f"{user_id}", "chatId": f"{chat_id}"})
                    await manager.send_personal_message(participantData, participant_connection)
                    # await manager.send_personal_message({ "message": f"{message}", "user_id": f"{participant_id}"}, participant_connection)
                    
                if not participant_connection: 
                    print("there is no participant connection")
                    print("add participant connection")
                    await manager.send_personal_message("participant is currently unavailable.", websocket)
        
        
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")
        
        
        
        
        
# todo impliment a chat id 

    # * Note: there should only be one chat_id for each group of participants 
        
    # *Option 1
        # * so you would need access to the chat Id in the messaages component. 
        # * if you have access to that Id which if you put the reicpient ids in the chat then you could make a request for the chat_id based on those participant ids
        
        # * if there is no chat_id make a new chat id based on those participants then attach that chat id to each of those messages. 

        # * pros to handling chat_id 
            # *this way it works its sufficient 
        
        # * cons to handling the chat_id
            # *you would have to make a request to obtain the chat_id by participants for every message? 
            # *that seems inefficient to me
            
    # * Option 2 
        # * you could compbine the recipent ids to make the chat id that way you always have access to the chat ids if you have access to the participants
        
        
        history 
        
        @api_app.get("/history/{participant_ids}")
# def get_messages(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100,  participant_ids: str = Query(), db: Session = Depends(get_db)):
def get_messages(token: Annotated[str, Depends(oauth2_scheme)], participant_ids: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print("hitting /history in main.py")
    print("! !!!!!!!!!!!!!!!!!!!!!!!participant ids in main.py", participant_ids)
    
    participant_ids_list = sorted( participant_ids.split(","))
    print("participant_ids_list !!!!!!!!!!!!!!!!!!!!!!!!!!!!", participant_ids_list)
    # for  participant_id in  participant_ids: 
    #     print(" participant_id *************",  participant_id)
    # return crud.get_user_message(db, skip=skip, limit=limit)
    # return crud.get_chat_history(db,  participant_ids=[1, 3])
    # return crud.get_chat_history(db)
    # return crud.get_chat_history(db,  participant_ids=sorted( participant_ids))
    return crud.get_chat_history(db,  participant_ids= participant_ids_list)
