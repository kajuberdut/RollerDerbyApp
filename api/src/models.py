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
   
    

class Event(SQLAlchemyBase):
    __tablename__ = "event"

    event_id = Column(Integer, Identity(), primary_key=True, index=True, unique=True)
    type = Column(String)
    time = Column(String)
    date = Column(String)
    theme = Column(String)
    level = Column(String)
    co_ed = Column(Boolean)
    detail = relationship("EventDetail", back_populates="events")
    
    
class EventDetail(SQLAlchemyBase):
    __tablename__ = "event_detail"

    event_det_id = Column(Integer, Identity(), primary_key=True)
    event_id = Column(Integer, ForeignKey("event.event_id"), primary_key=True, index=True, unique=True)
    # event = relationship(
    #     "Event", back_populates="details", uselist=False, polymorphic_identity="type"
    # )
    events = relationship("Event", back_populates="detail")
    
    
class Bout(EventDetail):
    __mapper_args__ = {"polymorphic_identity": "Bout"}

    opposing_team = Column(String)
    team = Column(String)


class Mixer(EventDetail):
    __mapper_args__ = {"polymorphic_identity": "Mixer"}

    signup_link = Column(String)
    