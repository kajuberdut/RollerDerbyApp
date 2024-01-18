from pydantic import BaseModel, field_validator, Field

# * Pydantic Models / Schemas for Location

class Location(BaseModel):
    """Pydantic class for location."""
    location_id: int = Field(default_factory=lambda: 0)
    city: str
    state: str
    
    @field_validator('state')
    def validate_us_states(cls, v):
        states_list = [
        '', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT','DE','FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]

        if v.upper() not in states_list:
            raise ValueError("Invalid State Code")
        return v   