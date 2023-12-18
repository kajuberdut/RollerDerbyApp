from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Identity
from sqlalchemy.orm import relationship
from .database import SQLAlchemyBase
import uuid

print("models.py is running")

# User SQLAlchemy Models

class User(SQLAlchemyBase):
    __tablename__ = "user"
    
    user_id = Column(Integer, Identity(), primary_key=True, index=True)
    derby_name = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
   
# Event SQLAlchemy Models

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
    
    
# class EventDetail(SQLAlchemyBase):
#     __tablename__ = "event_detail"

#     event_det_id = Column(Integer, Identity(), primary_key=True)
#     event_id = Column(Integer, ForeignKey("event.event_id"), primary_key=True, index=True, unique=True)
#     # event = relationship(
#     #     "Event", back_populates="details", uselist=False, polymorphic_identity="type"
#     # )
#     events = relationship("Event", back_populates="detail")
    
    
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
    
