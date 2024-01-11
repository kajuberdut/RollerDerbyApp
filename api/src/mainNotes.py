# **** WEB SOCKETS ****
# **** recipient ids on messages ****

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
            recipient_ids = data_dict["recipientIds"]
            date_time = data_dict["dateTime"]
            
             # *** chat history ***
            # chat_history = crud.get_chat_history(db=db, user_id=user_id, recipient_ids=recipient_ids)
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
            db_user_message = crud.create_user_message(db=db, sender_id=sender_id, message_id=db_message_id, recipient_ids=recipient_ids)
       
     
            for recipient_id in recipient_ids:
                
                # * add to message to database for each recipient 
                # db_recipient_message = crud.create_user_message(db=db, user_id=recipient_id, message_id=db_message_id)
                 # * add to message to database for each recipient 
                
  
                # * if there is no connection between the recipiet and the user you will need to add one
                recipient_connection = next((conn for conn in manager.active_connections if conn.user_id == recipient_id), None)
                print("recipient connection:", recipient_connection)
                print("recipient connection.user_id:", recipient_connection.user_id)
                if recipient_connection:
                    print("recipient connection is true")

                    userData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(userData, websocket)
     
                    recipientData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(recipientData, recipient_connection)
              
                    
                if not recipient_connection: 
                    print("there is no recipient connection")
                    print("add recipient connection")
                    await manager.send_personal_message("Recipient is currently unavailable.", websocket)
                
        
                
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
    
    # recipient_message = crud.create_message(db=db, )
    
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
            recipient_ids = data_dict["recipientIds"]
            date_time = data_dict["dateTime"]
            
            # print("message_id", message_id )
            # print("type message_id", type(message_id))
            # print("date_time: ******", date_time)
            # print("type date_time: ******", type(date_time))
            # print("message in main.py **** ", message)
            # print("sender id in main.py ****", sender_id)
            # print("recipient_id in main.py ****", recipient_ids)
            # print(" ****** manager.active_connections:", manager.active_connections)
          
            # print("~~~~ manager.active_connections ~~~~:", manager.active_connections)
            # print("~~~~ manager.active_connections ~~~~:", dir(manager.active_connections))
            
             # *** chat history ***
            # chat_history = crud.get_chat_history(db=db, user_id=user_id, recipient_ids=recipient_ids)
            # *** chat history ***
            
            # print("chat_history:", chat_history)
            # * add to message to database for user
            # ! THIS IS NOT RETURNING MY MESSAGE ID NOT SURE WHY 
            this_message = {
                "message": message, 
                "date_time": date_time,
                "message_id": 0,
                # "recipient_ids": recipient_ids
            }
            db_message_id = crud.create_message(db=db, message=this_message)
            # db_message_id = crud.create_message(db=db, message_id=message_id, message=message, date_time=date_time)
            # db_message_id = crud.create_message(db=db, message=message, date_time=date_time)
            print("db_message_id in main.py &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", db_message_id)
            db_user_message = crud.create_user_message(db=db, sender_id=sender_id, message_id=db_message_id, recipient_ids=recipient_ids)
            # 
            print("db_user_message:", db_user_message)
            print("db_user_message.recipient_ids:", db_user_message.recipient_ids)
            # todo this is the line you need to work on.... 
            # recipient_websocket = [ws for ws in manager.active_connections if ws.user_id == recipient_id]
            for recipient_id in recipient_ids:
                
                # * add to message to database for each recipient 
                # db_recipient_message = crud.create_user_message(db=db, user_id=recipient_id, message_id=db_message_id)
                 # * add to message to database for each recipient 
                
                print("Handling this recipient:", recipient_id)
                print("Type of recipient:", type(recipient_id))
                # * if there is no connection between the recipiet and the user you will need to add one
                recipient_connection = next((conn for conn in manager.active_connections if conn.user_id == recipient_id), None)
                print("recipient connection:", recipient_connection)
                print("recipient connection.user_id:", recipient_connection.user_id)
                if recipient_connection:
                    print("recipient connection is true")
                    # await manager.send_personal_message(f"You wrote: {message}", websocket)
                    userData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(userData, websocket)
                    # await manager.send_personal_message(f"Message from user with id {user_id}: {message}", recipient_connection)
                    
                    # await manager.send_personal_message(f"Message from user with id: {message}", recipient_connection)
                    
                    # recipientData = json.dumps({"message": f"{message}", "user_id": f"{recipient_id}" })
                    recipientData = json.dumps({"message": f"{message}", "user_id": f"{user_id}" })
                    await manager.send_personal_message(recipientData, recipient_connection)
                    # await manager.send_personal_message({ "message": f"{message}", "user_id": f"{recipient_id}"}, recipient_connection)
                    
                if not recipient_connection: 
                    print("there is no recipient connection")
                    print("add recipient connection")
                    await manager.send_personal_message("Recipient is currently unavailable.", websocket)
                
            
            # ! if you get rid of ----- if recipient_websocket 
                # ! then you will print those items in the frontend 
            
            # if recipient_websocket:
            #     await manager.send_personal_message(f"You wrote: {message}", recipient_websocket[0])
            #     await manager.broadcast(f"User Id {user_id} says: {message}")
                
            # await manager.send_personal_message(f"You wrote: {message}", websocket)
            # * broadcasting to all recipients regaradless of whether they user_id matches the recipient_id
            # await manager.broadcast(f"User Id {user_id} says: {message}")
            # else:
            #     raise Exception("no recipient web socket")
                
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
    
    # recipient_message = crud.create_message(db=db, )
    
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
            # chat_history = crud.get_chat_history(db=db, user_id=user_id, recipient_ids=recipient_ids)
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
                recipient_connection = next((conn for conn in manager.active_connections if conn.user_id == group_id), None)
                print("!!!!!!!!!!!!! recipient_connection:", recipient_connection)
                print("!!!!!!!!!!!!! recipient_connection.:", recipient_connection.user_id)
                
                
                if recipient_connection:
                    print("recipient connection is true")
                    # await manager.send_personal_message(f"You wrote: {message}", websocket)
                    userData = json.dumps({"message": f"{message}", "userId": f"{user_id}", "chatId": f"{chat_id}" })
                    await manager.send_personal_message(userData, websocket)
                    # await manager.send_personal_message(f"Message from user with id {user_id}: {message}", recipient_connection)
                    
                    # await manager.send_personal_message(f"Message from user with id: {message}", recipient_connection)
                    
                    # recipientData = json.dumps({"message": f"{message}", "user_id": f"{recipient_id}" })
                    recipientData = json.dumps({"message": f"{message}", "userId": f"{user_id}", "chatId": f"{chat_id}"})
                    await manager.send_personal_message(recipientData, recipient_connection)
                    # await manager.send_personal_message({ "message": f"{message}", "user_id": f"{recipient_id}"}, recipient_connection)
                    
                if not recipient_connection: 
                    print("there is no recipient connection")
                    print("add recipient connection")
                    await manager.send_personal_message("Recipient is currently unavailable.", websocket)
        
        
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User Id #{user_id} has left the chat")