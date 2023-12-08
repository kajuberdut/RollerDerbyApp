
# ! test for sqlalchemy follow along

from pydantic import BaseModel

print("schemas.py is running")


# class ItemBase(BaseModel):
#     title: str
#     description: str | None = None


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         from_attributes = True


# class UserBase(BaseModel):
#     email: str


# class UserCreate(UserBase):
#     password: str


# class User(UserBase):
#     id: int
#     is_active: bool
#     items: list[Item] = []

#     class Config:
#         from_attributes = True

# from pydantic import BaseModel


class UserBase(BaseModel):
    email: str


# this is so we are not returning sensitive information
class UserAdd(UserBase):
    password: str
    

class UserCreate(UserBase):
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
    
    class Config:
        from_attributes = True
    

    # note this shouold go on all classes so bouts/mixers etc when you get there
    # setting config value 
    # class Config:
    #     orm_mode = True
        