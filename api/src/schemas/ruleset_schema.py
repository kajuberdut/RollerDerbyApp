from pydantic import BaseModel, field_validator, Field

# * Pydantic Models / Schemas for Ruleset

class UserRuleset(BaseModel):
    """Pydantic class for users rulesets."""
    user_id: int
    ruleset_id: int

    class Config:
        from_attributes = True
        
class Ruleset(BaseModel): 
    """Pydantic class for ruleset."""
    ruleset_id: int = Field(default_factory=lambda: 0)
    name: str
    
    @field_validator('name')
    def validate_rulesets(cls, v):
        ruleset_list = [
        'WFTDA', 'USARS', 'banked track', 'short track'
        ]
        if v not in ruleset_list:
            raise ValueError("Invalid ruleset")
        return v  

    class Config:
        from_attributes = True