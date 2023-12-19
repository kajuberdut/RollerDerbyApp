
# ! Pydantic models.... schemas.py 
# ! Note that the pydantic models are verifying information going to the database and coming from the database so if you have a 
# 
# !class User(BaseModel): 
    # ! user_id: uuid.UUID
    # ! derby_name: str
    # ! email: str
    #! first_name: Optional[str]
    #! last_name: Optional[str]
    
    # ! This says that if you use this model to create a user you need each of these items on the user you pass into the api even if looks like this
    
    # ! This says that if you use this model to get users you will return all of these items even if some are null
    
#! {
#! "user_id":"50b07775-c310-4184-848b-b93bca61d071",
#! 	"derby_name": "Wicked Bitch of the West",
#! 	"email": "wb@gmail.com"
#!   "first_name": "null"
#!   "last_name: null"
#! }

states_list = [
'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT','DE','FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ','NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

# class Address(BaseModel):
#     street_address: str
#     city: str
#     state: str
#     zip_code: str
    
#     # may need to type code this 
#     @field_validator('state')
#     def validate_us_states(cls, value):
#     # def validate_us_states(cls, value: str) -> str:
#         if value.upper() not in states_list:
#             raise ValueError("Invalid State Code")
#         return value
      
#     @field_validator('zip_code')
#     def validate_zip_codes(cls, value):
#     # def validate_zip_codes(cls, value: str) -> str:
#         regexp = r"^\d{5}(?:-\d{4})?$"
#         match =  bool(re.match(regexp, value))
#         if not match:
#             raise ValueError("Invalid Zip Code")
#         return value
    
# class Location(BaseModel):
#     city: str
#     state: str
    
#     @field_validator('state')
#     def validate_us_states(cls, v):
#         if v.upper() not in states_list:
#             raise ValueError("Invalid State Code")
#         return v   
    
    
    
# class Insurance(BaseModel):
#     insurance_id: int
#     WFTDA = str
#     USARS = str
#     other = str 


class EventModel(BaseModel):
    # ! other items already in model
    
    address: Address
    theme: str
    level: str
    jersey_colors: str
    ruleset: str
    co_ed: bool
    
    
    # @validator('ruleset', pre=True)
    # def ruleset_must_be_valid(cls, value):
    #     if value not in ['WFTDA',  'USARS', 'Banked Track', 'Short Track']:
    #         raise ValueError('Invalid ruleset')
    #     return value
    
    # @validator('level', pre=True)
    # def level_must_be_valid(cls, value):
    #     if value not in ['AA',  'AA/A', 'A', 'A/B', 'B', 'B/C', 'C', 'All Levels']:
    #         raise ValueError('Invalid level')
    #     return value


# RulesetsType: TypeAlias  = Literal["WFTDA", "USARS", "Banked Track", "Flat Track"]

# ! note come back to this if needed. 
class UserBase(BaseModel): 
    user_id: uuid.UUID
    derby_name: str
    email: str
    # image: ??? 
    # first_name: Optional[str]
    # last_name: Optional[str]
    # facebook_name: Optional[str]
    # about: Optional[str]
    # primary_number: Optional[int]
    # secondary_number: Optional[int]
    # level: Optional[str]
    # insurance: Optional[dict]
    # location: Optional[Location]
    # associated_leagues: Optional[list[str]]
    # ruleset: Optional[dict]
    # position: Optional[dict]