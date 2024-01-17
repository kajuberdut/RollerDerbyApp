from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.address_crud import *
from ..crud.chat_crud import *
from ..crud.event_crud import *
from ..crud.group_crud import *
from ..crud.insurance_crud import *
from ..crud.location_crud import *
from ..crud.position_crud import *
from ..crud.ruleset_crud import *

router = APIRouter()


# * get /events/ 
# * returns all events 

@router.get("/events/", response_model=list[EventBase])
def get_events(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud_get_events(db, skip=skip, limit=limit)
    return events

# * get /events/{event_type} 
# * returns all events that match query by type, dates and city and/or state

@router.get("/events/{type}", response_model=list[EventBase])
def get_events(token: Annotated[str, Depends(oauth2_scheme)], type: str, city: str = Query(None), state: str = Query(None), zip_code: str = Query(None), start_date: str = Query(None), end_date: str = Query(None), db: Session = Depends(get_db)):
    
    events = crud_get_events_by_type_date_location(db, type=type, city=city, state=state, zip_code=zip_code, start_date=start_date, end_date=end_date)
    
    print("events in get /events/{type} in main.py", events)
    return events

# * get /bouts/ 
# * returns all bouts
# ! moved this one over to routers 

@router.get("/bouts/", response_model=list[Bout])
def get_bouts(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bouts = crud_get_bouts(db, skip=skip, limit=limit)
    return bouts

# * get /bouts/{event_id} 
# * returns one bout 
# ! moved this one over to routers 

@router.get("/bouts/{event_id}", response_model=Bout)
def get_bout(token: Annotated[str, Depends(oauth2_scheme)], event_id: int, db: Session = Depends(get_db)):
    
    bout = crud_get_bout_by_id(db, event_id=event_id)
    
    if event_id is None: 
        raise HTTPException(status_code=404, detail=f"Bout with event id {event_id} not found.")
    
    return bout

# * get /mixers/ 
# * returns all mixers

@router.get("/mixers/", response_model=list[Mixer])
def get_mixers(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    mixers = crud_get_mixers(db, skip=skip, limit=limit)
    return mixers

# * get /mixers/{event_id} 
# * returns one mixer 
# ! moved this one over to routers 

@router.get("/mixers/{event_id}", response_model=Mixer)
def get_mixer(token: Annotated[str, Depends(oauth2_scheme)], event_id: int, db: Session = Depends(get_db)):
    
    mixer = crud_get_mixer_by_id(db, event_id=event_id)
    
    if event_id is None: 
        raise HTTPException(status_code=404, detail=f"Mixer with event id {event_id} not found.")
    
    return mixer


# * post /bouts/ 
# * creates a new bout 
# ! moved this one over to routers

@router.post("/bouts/", response_model=EventBase)
def create_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: Bout, address: Address, db: Session = Depends(get_db)):
    print("bout in event_router", bout)

    existing_address = crud_get_address(db=db, address=address)
    
    if existing_address: 
        address_id = existing_address.address_id
    else:
        address_id = crud_create_address(db=db, address=address)

    bout.address_id = address_id
    existing_bout = crud_get_bout_by_address_date_time_team_opposing_team(db=db, bout=bout)

    if existing_bout: 
        raise HTTPException(status_code=409, detail=f"Bout already exists at the same address, on the same date, at the same time, and with the same teams.")
    
    group = {
        "participant_ids": [],
        "name": bout.theme
    }
    
    group = crud_create_group(db=db, group=group)
    bout.group_id = group.group_id
    
    chat = {
        "group_id": group.group_id
        }
    
    chat = crud_create_chat(db=db, chat=chat)  
    bout.chat_id = chat.chat_id
   
    return crud_create_bout(db=db, bout=bout)


# * post /mixers/ 
# * creates a new mixer with address 
# ! moved this one over to routers

@router.post("/mixers/", response_model=EventBase)
def create_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: Mixer, address: Address, db: Session = Depends(get_db)):
    print("post mixer in event_router.py:", mixer)
    
    existing_address = crud_get_address(db=db, address=address)

    if existing_address: 
        address_id = existing_address.address_id
    else:
        address_id = crud_create_address(db=db, address=address)
        
    mixer.address_id = address_id
    existing_mixer = crud_get_mixer_by_address_date_time_theme(db=db, mixer=mixer)

    if existing_mixer: 
        raise HTTPException(status_code=409, detail=f"Mixer already exists at the same address, on the same date, at the same time, and with the same theme.")
      
    group = {
        "participant_ids": [],
        "name": mixer.theme
    }
    
    group = crud_create_group(db=db, group=group)
    mixer.group_id = group.group_id
    
    chat = {
        "group_id": group.group_id
        }
    
    chat = crud_create_chat(db=db, chat=chat)
    mixer.chat_id = chat.chat_id
   
    return crud_create_mixer(db=db, mixer=mixer)

# * put /bouts/{event_id} 
# * updates an existing bout 

@router.put("/bouts/{event_id}", response_model=BoutUpdate)
def update_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: BoutUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /bouts/{event_id}', bout)
    
    db_bout = crud_get_bout_by_id(db, event_id=event_id)    
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud_update_bout(db=db, bout=bout, event_id=event_id)

# * put /mixers/{event_id} 
# * updates an existing mixer

@router.put("/mixers/{event_id}", response_model=MixerUpdate)
def update_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: MixerUpdate, event_id: int, db: Session = Depends(get_db)):
    
    print('user in /mixers/{event_id}', mixer)
    
    db_mixer = crud_get_mixer_by_id(db, event_id=event_id)    
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud_update_mixer(db=db, mixer=mixer, event_id=event_id)

# * delete /bouts/{event_id} 
# * deletes an existing bout
# todo note you may have to add some security measures on this

@router.delete("/bouts/{event_id}", response_model=EventDelete)
def delete_bout(token: Annotated[str, Depends(oauth2_scheme)], bout: EventDelete, event_id: int, db: Session = Depends(get_db)):
    
    print('bout in /bouts/{event_id}', bout)
     
    db_bout = crud_get_bout_by_id(db, event_id=bout.event_id)      
 
    if not db_bout:
        raise HTTPException(status_code=400, detail=f"Bout with id {event_id} doesn't exist.")
    
    return crud_delete_bout(db=db, bout=bout, event_id=bout.event_id)

# * delete /mixers/{event_id} 
# * deletes an existing mixer
# todo note you may have to add some security measures on this

@router.delete("/mixers/{event_id}", response_model=EventDelete)
def delete_mixer(token: Annotated[str, Depends(oauth2_scheme)], mixer: EventDelete, event_id: int, db: Session = Depends(get_db)):
    
    print('mixer in /mixers/{event_id}', mixer)
 
    db_mixer = crud_get_mixer_by_id(db, event_id=mixer.event_id)      
 
    if not db_mixer:
        raise HTTPException(status_code=400, detail=f"Mixer with id {event_id} doesn't exist.")
    
    return crud_delete_mixer(db=db, mixer=mixer, event_id=mixer.event_id)