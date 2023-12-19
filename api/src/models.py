from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Identity
from sqlalchemy.orm import relationship
from .database import SQLAlchemyBase

print("models.py is running")

# User SQLAlchemy Models


class User(SQLAlchemyBase):
    __tablename__ = "user"
    
    user_id = Column(Integer, Identity(), primary_key=True, index=True)
    derby_name = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    facebook_name = Column(String, nullable=True)
    about = Column(String, nullable=True)
    primary_number = Column(Integer, nullable=True)
    secondary_number = Column(Integer, nullable=True)
    level = Column(String, nullable=True)
    associated_leagues = Column(String, nullable=True)
    # ruleset = relationship("UserRuleset", back_populates="user")
    # ruleset = relationship("Ruleset", back_populates="user")
    ruleset_id = Column(Integer, ForeignKey("ruleset.ruleset_id"), nullable=True)
    
class Ruleset(SQLAlchemyBase):
    __tablename__ = "ruleset"

    ruleset_id = Column(Integer, primary_key=True)
    wftda = Column(Boolean)
    usars = Column(Boolean)  
    banked_track = Column(Boolean)
    short_track = Column(Boolean) 
    user = relationship("User", backref="ruleset")
    # user = relationship("User", back_populates="ruleset") 


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
    
