from pydantic import BaseModel, Field, field_validator
from typing import Union, Optional

# * Pydantic Models / Schemas for Team Invite

class TeamInvite(BaseModel): 
    """Pydantic class for create team invite."""
    invite_id: int
    team_id: int
    sender_id: int
    recipient_id: int
    status: str

class CreateTeamInvite(BaseModel): 
    """Pydantic class for create team invite."""
    team_id: int
    sender_id: int
    recipient_id: int
    
class UpdateTeamInvite(BaseModel): 
    """Pydantic class for update team invite."""
    status: str
    