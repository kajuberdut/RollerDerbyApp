
# ! if you decide to go back to socketIO this might be worth lookating at 
# ! https://stackoverflow.com/questions/73766582/getting-repeated-404-errors-on-python-server-when-connecting-using-socket-io


# ! web socket.io notes that was not working

# from fastapi import FastAPI
# from fastapi_socketio import SocketManager

# api_app = FastAPI()
# sio = SocketManager(app=api_app)

# @api_app.sio.event
# async def handle_join(sid, *args, **kwargs):
#     print("User joined")
#     await sio.emit("lobby", "User joined")

# @api_app.sio.event
# async def test(sid, *args, **kwargs):
#     print("Test event")
#     await sio.emit("hey", "joe")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(api_app, host="0.0.0.0", port=8000)


# # ***  YOUR IMPORTS ***
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from . import crud, models, schemas, socket_manager
# # ***  YOUR IMPORTS ***

# # # # * imports for socket.io
# from fastapi_socketio import SocketManager
# #  # * imports for socket.io




# from .database import SessionLocal, engine, create_all_tables

# print("engine in main.py:", engine)
# print("main.py is running")

# create_all_tables()

# models.SQLAlchemyBase.metadata.create_all(bind=engine)


# api_app = FastAPI()

# # **** socket.io *****************************
# sio = SocketManager(app=api_app)
# print("sio SocketManager", sio)
# # **** socket.io *****************************

# origins = [
#     "http://localhost/3000",
#     # "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:8000"
    
# ]

# api_app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # # ensures database is always closed after a request
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
        

# #  todo **** socket.io routes *****

# @api_app.sio.on('join')
# async def handle_join():
#     print("JOIN SOCKET.IO  IS RUNNING")
#     await sio.emit('lobby', 'User joined')


# @api_app.sio.on('socket')
# async def test():
#     print("SOCKET SOCKET.IO  IS RUNNING")
#     await sio.emit('hey', 'joe')


# #  todo **** socket.io routes ***** 