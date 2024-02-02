from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models
from ..schemas.team_invite_schema import * 

def crud_create_team_invite(db: Session, team_invite: CreateTeamInvite):
    """Create a specific team invite."""
    print("crud_create_team_invite is running in team_invite_crud.py", team_invite)

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

