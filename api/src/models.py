from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Identity
from sqlalchemy.orm import relationship
from .database import SQLAlchemyBase

print("models.py is running")

# User SQLAlchemy Models

class UserRuleset(SQLAlchemyBase):
    __tablename__ = "user_ruleset"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    ruleset_id = Column(Integer, ForeignKey("ruleset.ruleset_id"), primary_key=True)
    user = relationship("User", back_populates="ruleset")
    ruleset = relationship("Ruleset", back_populates="user")
    
class UserPosition(SQLAlchemyBase):
    __tablename__ = "user_position"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    position_id = Column(Integer, ForeignKey("position.position_id"), primary_key=True)
    user = relationship("User", back_populates="position")
    position = relationship("Position", back_populates="user") 

class User(SQLAlchemyBase):
    __tablename__ = "user"
    
    user_id = Column(Integer, Identity(), primary_key=True, index=True)
    # ! changing derby name to username but will have it appear as derby_name in frontend.
    # derby_name = Column(String, unique=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    facebook_name = Column(String, nullable=True)
    about = Column(String, nullable=True)
    primary_number = Column(Integer, nullable=True)
    secondary_number = Column(Integer, nullable=True)
    level = Column(String, nullable=True)
    # ruleset_id = Column(Integer, ForeignKey("ruleset.ruleset_id"), nullable=True)
    ruleset = relationship("UserRuleset", back_populates="user")
    position = relationship("UserPosition", back_populates="user")
    # position_id = Column(Integer, ForeignKey("position.position_id"), nullable=True)
    location_id = Column(Integer, ForeignKey("location.location_id"), nullable=True)
    associated_leagues = Column(String, nullable=True)
    # ruleset = relationship("UserRuleset", back_populates="user")
    # ruleset = relationship("Ruleset", back_populates="user")
    
class Ruleset(SQLAlchemyBase):
    __tablename__ = "ruleset"

    ruleset_id = Column(Integer, primary_key=True)
    name = Column(String)
    user = relationship("UserRuleset", back_populates="ruleset")
    # wftda = Column(Boolean)
    # usars = Column(Boolean)  
    # banked_track = Column(Boolean)
    # short_track = Column(Boolean) 
    # user = relationship("User", backref="ruleset")
    
class Position(SQLAlchemyBase):
    __tablename__ = "position"  
    position_id = Column(Integer, primary_key=True)
    position = Column(String)
    user = relationship("UserPosition", back_populates="position")
    # jammer = Column(Boolean)
    # blocker = Column(Boolean)
    # pivot = Column(Boolean)
    # user = relationship("User", backref="position")
    
class Location(SQLAlchemyBase):
    __tablename__ = "location"

    location_id = Column(Integer, primary_key=True)
    city = Column(String)
    state = Column(String)    
    user = relationship("User", backref="location")


class EventBase(SQLAlchemyBase):
    __tablename__ = "event"

    event_id = Column(Integer, Identity(), primary_key=True, index=True, unique=True)
    type = Column(String, nullable=False)
    date = Column(String, nullable=False)
    address_id = Column(Integer, ForeignKey("address.address_id"), nullable=False)
    time = Column(String, nullable=False)
    time_zone = Column(String, nullable=False)
    description = Column(String, nullable=False)
    theme = Column(String, nullable=False)
    level = Column(String, nullable=False)
    co_ed = Column(Boolean, nullable=False)
    ruleset = Column(String, nullable=False)
    # jersey_colors: Column(String, nullable=False)
    # address = relationship("Address", backref="events")
    # detail = relationship("EventDetail", back_populates="events")
    
    __mapper_args__ = {
        "polymorphic_on": "type",
        "polymorphic_identity": "event_base",
    }
    

class Bout(EventBase):
    __mapper_args__ = {"polymorphic_identity": "bout"}

    opposing_team = Column(String)
    team = Column(String)


class Mixer(EventBase):
    __mapper_args__ = {"polymorphic_identity": "mixer"}

    signup_link = Column(String)
    
    
class Address(SQLAlchemyBase):
    __tablename__ = "address"

    address_id = Column(Integer, primary_key=True)
    # name: Column(String, nullable=True)
    name: Column(String, nullable=False)
    street_address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    events = relationship("EventBase", backref="address")
    
