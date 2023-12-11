
# ! test for sqlalchemy follow along

# from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship

from .database import Base
# from database import Base
# import database 
# from database import Base

print("models.py is running")


# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)

#     items = relationship("Item", back_populates="owner")


# class Item(Base):
#     __tablename__ = "items"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     description = Column(String, index=True)
#     owner_id = Column(Integer, ForeignKey("users.id"))

#     owner = relationship("User", back_populates="items")
    
    
# ! below  is sqlalchemy less than 2.0 
    
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
# from .database import Base
import uuid
    
class Rulesets(Base):
    __tablename__ = "rulesets"  
    rulesets_id = Column(Integer, primary_key=True)
    plays_WFTDA = Column(Boolean)
    plays_USARS = Column(Boolean)
    plays_banked_track = Column(Boolean)
    plays_short_track = Column(Boolean)

class Insurance(Base):
    __tablename__ = "insurance"  
    insurance_id = Column(Integer, primary_key=True)
    WFTDA = Column(String)
    USARS = Column(String)
    other = Column(String)
 

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(String, primary_key=True, index=True)
    derby_name = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    facebook_name = Column(String)
    about = Column(String)
    primary_number = Column(Integer)
    seondary_Number = Column(Integer)
    level = Column(String)
    insurance = relationship("User Insurance", back_populates="user")
    location = relationship("UserLocation", back_populates="user")
    associated_leagues = Column(String)
    played_rulesets = relationship("UserRulesetAssociation", back_populates="user")
    # associated_leagues = relationship("UserLeagueAssociation", back_populates="user")
    

    # ! it may be more efficient to have played rulesets and maybe associated leagues in a table? Check that out later. 
    
    # ! YAY!!! This is buidling a table for me so you will neeed to go back and adjust So you can get all the correct tables in here and then you will have to adjust other files. 

    
    # Define a Column of type String or Text to hold the serialized JSON representation of the list.
    # Use the json module in Python to convert the list to a JSON string before storing it in the database.
    # When retrieving data, convert the JSON string back to a list using the json.loads() function.
    
class UserRuleset(Base):
    __tablename__ = "user_ruleset"

    user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
    rulesets_id = Column(Integer, ForeignKey("rulesets.rulesets_id"), primary_key=True)
    user = relationship("User", backref="rulesets")
    ruleset = relationship("Ruleset")
    
class UserInsurance(Base):
    __tablename__ = "user_insurance"

    user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
    insurance_id = Column(Integer, ForeignKey("rulesets.rulesets_id"), primary_key=True)
    user = relationship("User", backref="insurance")
    insurance = relationship("Insurance")
    
class UserLocation(Base):
    __tablename__ = "user_location"

    user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
    location_id = Column(Integer, ForeignKey("rulesets.rulesets_id"), primary_key=True)
    user = relationship("User", backref="location")
    location = relationship("Location")

# class UserLeagueAssociation(Base):
#     __tablename__ = "user_league_associations"

#     user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
#     league_id = Column(Integer, ForeignKey("leagues.league_id"), primary_key=True)
#     user = relationship("User", backref="associated_leagues")
#     league = relationship("League")
    
        # items = relationship("Item", back_populates="owner")
        
        
class Address(Base):
    __tablename__ = "address"

    address_id = Column(Integer, primary_key=True)
    street_address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    
class Location(Base):
    __tablename__ = "location"

    location_id = Column(Integer, primary_key=True)
    city = Column(String)
    state = Column(String)

class Event(Base):
    __tablename__ = "events"

    event_id = Column(String, primary_key=True, index=True, unique=True)
    type = Column(String)
    address_id = Column(Integer, ForeignKey("address.id"))
    time = Column(String)
    date = Column(String)
    theme = Column(String)
    level = Column(String)
    jersey_colors = Column(String)
    ruleset = Column(String)
    co_ed = Column(Boolean)

    address_id = relationship("Address", backref="events")
    details = relationship("EventDetails", back_populates="event")
    
    # Optional: Polymorphic relationship
    # details = relationship(
    #     "EventDetails", uselist=False, polymorphic_identity="type", back_populates="event"
    # )
    
        # played_rulesets = relationship("UserRulesetAssociation", back_populates="user")

# class Event(Base):
#     __tablename__ = "events"

#     event_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
#     type = Column(Enum(RulesetsType))
#     address_id = Column(Integer, ForeignKey("address.id"))
#     time = Column(DateTime)
#     date = Column(Date)
#     theme = Column(String)
#     level = Column(String)
#     jersey_colors = Column(String)
#     ruleset = Column(String)
#     co_ed = Column(Boolean)

#     address = relationship("Address", backref="events")

#     # Optional: Polymorphic relationship
#     details = relationship(
#         "EventDetails", uselist=False, polymorphic_identity="type", back_populates="event"
#     )

class EventDetails(Base):
    __tablename__ = "event_details"

    event_dets_id = Column(Integer, primary_key=True)
    event_id = Column(String, primary_key=True, index=True, unique=True)
    # event = relationship(
    #     "Event", back_populates="details", uselist=False, polymorphic_identity="type"
    # )
    event = relationship("Event", back_populates="details")

# class EventDetails(Base):
#     __tablename__ = "event_details"

#     event_dets_id = Column(Integer, primary_key=True)
#     event_id = Column(
#         UUID(as_uuid=True), ForeignKey("events.id"), nullable=False, unique=True
#     )
#     event = relationship(
#         "Event", back_populates="details", uselist=False, polymorphic_identity="type"
#     )

    # Subclass-specific attributes


class Bout(EventDetails):
    __mapper_args__ = {"polymorphic_identity": "Bout"}

    opposing_team = Column(String)
    team = Column(String)


class Mixer(EventDetails):
    __mapper_args__ = {"polymorphic_identity": "Mixer"}

    signup_link = Column(String)

# class Mixer(EventDetails):
#     __mapper_args__ = {"polymorphic_identity": "Mixer"}

#     signup_link = Column(URL)