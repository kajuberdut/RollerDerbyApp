
from pydantic import BaseModel 

# * Pydantic Models / Schemas for Token

# todohttps://www.gormanalysis.com/blog/many-to-many-relationships-in-fastapi/

SECRET_KEY = "0e4f3587ea32a1b62169336a04a71efc160b34c93c3f03bdc1895c6058dbbcec"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#  **** Token schemas for testing Authentication *** 

class Token(BaseModel):
    """Pydantic class for token."""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Pydantic class for token data."""
    user_id: int | None = None
    # expiration_time: str
    
#    