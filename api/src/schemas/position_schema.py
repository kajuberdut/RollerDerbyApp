from pydantic import BaseModel, field_validator, Field

# * Pydantic Models / Schemas for Position

class UserPosition(BaseModel):
    """Pydantic class for users positions."""
    user_id: int
    position_id: int

    class ConfigDict:
        from_attributes = True


class Position(BaseModel): 
    """Pydantic class for positions."""
    position_id: int = Field(default_factory=lambda: 0)
    position: str
    
    @field_validator('position')
    def validate_rulesets(cls, v):
        position_list = [
        'jammer', 'pivot', 'blocker'
        ]
        if v not in position_list:
            raise ValueError("Invalid position")
        return v  

    class ConfigDict:
        from_attributes = True