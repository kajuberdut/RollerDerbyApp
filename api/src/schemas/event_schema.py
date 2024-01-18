from pydantic import BaseModel, field_validator, Field

# * Pydantic Models / Schemas for Event

class EventBase(BaseModel):
    """Pydantic base class for event."""
    event_id: int = Field(default_factory=lambda: 0)
    type: str
    date: str
    address_id: int
    time: str
    time_zone: str
    theme: str
    description: str
    level: str
    co_ed: bool
    ruleset: str
    floor_type: str
    jersey_colors: str
    group_id: int
    chat_id: int

    
    class ConfigDict:
        from_attributes = True
    
    @field_validator('level', mode="before")
    @classmethod
    def level_must_be_valid(cls, value):
        if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
            raise ValueError('Invalid level')
        return value
    
    @field_validator('ruleset', mode="before")
    @classmethod
    def ruleset_must_be_valid(cls, value):
        if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
            raise ValueError('Invalid ruleset')
        return value

class Bout(EventBase):
    """Pydantic class for bout that inherits event base class."""
    opposing_team: str
    team: str
    

class Mixer(EventBase):
    """Pydantic class for mixer that inherits event base class."""
    signup_link: str
    
    
class BoutUpdate(EventBase):
    """Pydantic class for bout update that inherits event base class."""
    opposing_team: str
    team: str
     
class MixerUpdate(EventBase):
    """Pydantic class for mixer update that inherits event base class."""
    signup_link: str
    
class EventDelete(BaseModel): 
    """Pydantic class for event delete."""
    event_id: int 