from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


# this is so we are not returning sensitive information
class UserAdd(UserBase):
    password: str


class User(UserBase):
    user_id: int
    derby_name: str
    about: str
    location: str
    level: str
    facebook_name: str
    played_rulesets: list[str]
    associated_leagues: list[str]
    

    # note this shouold go on all classes so bouts/mixers etc when you get there
    # setting config value 
    class Config:
        orm_mode = True
        