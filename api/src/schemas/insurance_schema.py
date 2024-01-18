from pydantic import BaseModel, field_validator, Field

# * Pydantic Models / Schemas for Insurance

class UserInsurance(BaseModel):
    """Pydantic class for users insurances."""
    user_id: int
    insurance_id: int
    insurance_number: str

    class ConfigDict:
        from_attributes = True
        
class Insurance(BaseModel): 
    """Pydantic class for insurance."""
    insurance_id: int = Field(default_factory=lambda: 0)
    type: str
    insurance_number: str
    
    @field_validator('type')
    def validate_insurance(cls, v):
        insurance_list = [
        'WFTDA', 'USARS', 'other'
        ]
        if v not in insurance_list:
            raise ValueError("Invalid insurance")
        return v  

    class ConfigDict:
        from_attributes = True
        
class InsuranceOutput(BaseModel): 
    """Pydantic class for insurance output."""
    insurance_id: int = Field(default_factory=lambda: 0)
    type: str
    
    @field_validator('type')
    def validate_insurance(cls, v):
        insurance_list = [
        'WFTDA', 'USARS', 'other'
        ]
        if v not in insurance_list:
            raise ValueError("Invalid insurance")
        return v 