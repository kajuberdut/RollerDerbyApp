from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.chat_crud import *
from ..crud.group_crud import *
from ..crud.message_crud import *
from ..crud.team_invite_crud import *

router = APIRouter()

# * post /invites
# * adds invite to invite teams

@router.post("/invites/", response_model=CreateTeamInvite)
def add_invite_to_team_invite(token: Annotated[str, Depends(oauth2_scheme)], team_invite: TeamInvite, db: Session = Depends(get_db)):

    # todo will need to check and see if that invite exists first
    
    team_invite = crud_create_team_invite(db=db, team_invite=team_invite)
    
    return team_invite

# * get /invites/user/{user_id}
# * get invites by user_id

@router.get("/invites/user/{user_id}")
def get_team_invites_by_user_id(token: Annotated[str, Depends(oauth2_scheme)], user_id: int, db: Session = Depends(get_db)):
        
    team_invites = crud_get_team_invites_by_user_id(db=db, user_id=user_id)

    return team_invites

# * get /invites/pending{group_id}
# * get pending invites by group_id

@router.get("/invites/pending/{group_id}")
def get_pending_team_invites_by_group_id(token: Annotated[str, Depends(oauth2_scheme)], group_id: int, db: Session = Depends(get_db)):
        
    pending_team_invites = crud_get_pending_team_invites_by_group_id(db=db, group_id=group_id)

    return pending_team_invites

# * put /invites/{team_id} 
# * updates an team invite 

@router.put("/invites/{invite_id}", response_model=UpdateTeamInvite)
def update_team_invite_status(token: Annotated[str, Depends(oauth2_scheme)], team_invite: UpdateTeamInvite, invite_id: int, db: Session = Depends(get_db)):
    
    print('team_invite in /invites/{team_id}', team_invite)
    
    db_team_invite = crud_get_team_invite_by_invite_id(db, invite_id=invite_id)    
 
    if not db_team_invite:
        raise HTTPException(status_code=400, detail=f"Team invite with id {invite_id} doesn't exist.")
    
    # return crud_update_bout(db=db, bout=bout, event_id=event_id)
    return crud_update_team_invite_status(db=db, team_invite=team_invite, invite_id=invite_id)