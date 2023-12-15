from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Identity
from sqlalchemy.orm import relationship
from .database import SQLAlchemyBase
import uuid

print("models.py is running")


class User(SQLAlchemyBase):
    __tablename__ = "user"
    
    user_id = Column(Integer, Identity(), primary_key=True, index=True)
    derby_name = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
   
    

class EventBase(SQLAlchemyBase):
    __tablename__ = "event"

    event_id = Column(Integer, Identity(), primary_key=True, index=True, unique=True)
    type = Column(String)
    date = Column(String)
    time = Column(String)
    time_zone = Column(String)
    description = Column(String)
    theme = Column(String)
    level = Column(String)
    co_ed = Column(Boolean)
    ruleset = Column(String)
    jersey_colors: Column(String)
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
    