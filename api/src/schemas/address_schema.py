from pydantic import BaseModel, field_validator, Field

# * Pydantic Models / Schemas for Address

class Address(BaseModel):
    """Pydantic class for address."""
    address_id: int = Field(default_factory=lambda: 0)
    street_address: str
    city: str
    state: str
    zip_code: str
    
    @field_validator('state')
    @classmethod
    def validate_us_states(cls, value):
        states_list = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT','DE','FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]
        if value.upper() not in states_list:
            raise ValueError("Invalid State Code")
        return value