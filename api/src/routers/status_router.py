from fastapi import APIRouter 


router = APIRouter(
    prefix="/status",
    tags=["status"],
)

# * post /status 
# * adds a status

@router.post("/")
def create_status():
    print("status in status_router.py is getting hit:")
    return {"post_status": "ok"}

# * get /status
# * gets all addresses 

@router.get("/")
def get_addresses():

    return {"get_status": "ok"}

