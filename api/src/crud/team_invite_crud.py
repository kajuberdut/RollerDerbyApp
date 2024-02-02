from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy import func
from .. import models
from ..schemas.team_invite_schema import * 

def crud_create_team_invite(db: Session, team_invite: CreateTeamInvite):
    """Create a specific team invite."""
    print("crud_create_team_invite is running in team_invite_crud.py", team_invite)
    
    # ! note you changed this if there is an issue when you restart the database
    
    existing_team_invite = crud_get_team_invite_by_recipient_id_team_id(db, recipient_id=team_invite.recipient_id, team_id=team_invite.team_id)

    if existing_team_invite: 
        return existing_team_invite

    db_team_invite = models.TeamInvite(team_id=team_invite.team_id, sender_id=team_invite.sender_id, recipient_id=team_invite.recipient_id)
   
    db.add(db_team_invite)
    db.commit()
    db.refresh(db_team_invite)
    
    return db_team_invite

def crud_get_team_invite_by_invite_id(db: Session, invite_id: int):
    """Retrieve one team invite by team_id."""
    return db.query(models.TeamInvite).filter(models.TeamInvite.invite_id == invite_id).first()

def crud_get_team_invites_by_user_id(db: Session, user_id: int):
    """Retrieve all team invites by one recipient_id ."""
    print("get_team_invites_by_user_id in team_invites_crud.py:", user_id)
    
    team_invites_db = db.query(models.TeamInvite.invite_id, models.TeamInvite.team_id, models.TeamInvite.sender_id, models.TeamInvite.status).filter(models.TeamInvite.recipient_id == user_id).filter(models.TeamInvite.status == "pending").all()
   
    return team_invites_db

def crud_update_team_invite_status(db: Session, team_invite: UpdateTeamInvite, invite_id): 
    """Update a specific bout by event_id."""
    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    db_team_invite = crud_get_team_invite_by_invite_id(db, invite_id)
    
    team_invite = {
        "status": team_invite.status,
    }

    for field, value in team_invite.items():
        if value is not None: 
            setattr(db_team_invite, field, value)
            print(f"Updating field: {field} with value: {value}")
            
    print("db_team_invite UPDATED:", db_team_invite)

    db.commit()

    return db_team_invite

def crud_get_team_invite_by_recipient_id_team_id(db: Session, recipient_id: int, team_id: int,):
    """Retrieve a team invite by one recipient_id and team_id."""
        
    db_team_invite = db.query(models.TeamInvite).filter(models.TeamInvite.recipient_id == recipient_id).filter(models.TeamInvite.team_id == team_id).first()

    return db_team_invite


def crud_delete_team_invite_by_recipient_id_group_id(db: Session, recipient_id: int, team_id: int): 
    """Delete a team invite by team_id and recipient_id"""

    db_team_invite = crud_get_team_invite_by_recipient_id_team_id(db, recipient_id, team_id)
    
    if db_team_invite is None: 
        raise HTTPException(status_code=404, detail=f"Team invite with recipient id {recipient_id} and team id {team_id} not found.")
    
    db.delete(db_team_invite)
    db.commit()
    
    return db_team_invite

