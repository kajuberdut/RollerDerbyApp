from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Identity, LargeBinary
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
    
class UserInsurance(SQLAlchemyBase):
    __tablename__ = "user_insurance"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    insurance_id = Column(Integer, ForeignKey("insurance.insurance_id"), primary_key=True)
    insurance_number = Column(String)
    user = relationship("User", back_populates="insurance")
    insurance = relationship("Insurance", back_populates="user") 
    
class UserGroup(SQLAlchemyBase): 
    __tablename__ = "user_group"

    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    group_id = Column(Integer, ForeignKey("group.group_id"), primary_key=True)
    user = relationship("User", back_populates="group")
    group = relationship("Group", back_populates="user") 

class User(SQLAlchemyBase):
    __tablename__ = "user"
    
    user_id = Column(Integer, Identity(), primary_key=True, index=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    image = Column(LargeBinary, nullable=True)
    phone_number = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    additional_info = Column(String, nullable=True)
    facebook_name = Column(String, nullable=True)
    about = Column(String, nullable=True)
    primary_number = Column(String, nullable=True)
    secondary_number = Column(String, nullable=True)
    level = Column(String, nullable=True)
    ruleset = relationship("UserRuleset", back_populates="user")
    position = relationship("UserPosition", back_populates="user")
    insurance = relationship("UserInsurance", back_populates="user")
    group = relationship("UserGroup", back_populates="user")
    # message = relationship("UserMessage", back_populates="user")
    location_id = Column(Integer, ForeignKey("location.location_id"), nullable=True)
    associated_leagues = Column(String, nullable=True)
    # ruleset_id = Column(Integer, ForeignKey("ruleset.ruleset_id"), nullable=True)
    # position_id = Column(Integer, ForeignKey("position.position_id"), nullable=True)
    # ruleset = relationship("UserRuleset", back_populates="user")
    # ruleset = relationship("Ruleset", back_populates="user")
    
class Ruleset(SQLAlchemyBase):
    __tablename__ = "ruleset"

    ruleset_id = Column(Integer, primary_key=True)
    name = Column(String)
    user = relationship("UserRuleset", back_populates="ruleset")

    
class Position(SQLAlchemyBase):
    __tablename__ = "position"  
    position_id = Column(Integer, primary_key=True)
    position = Column(String)
    user = relationship("UserPosition", back_populates="position")


class Insurance(SQLAlchemyBase):
    __tablename__ = "insurance"  
    insurance_id = Column(Integer, primary_key=True)
    type = Column(String)
    user = relationship("UserInsurance", back_populates="insurance")    
    
class Group(SQLAlchemyBase):
    __tablename__ = "group"  
    group_id = Column(Integer, primary_key=True)
    name = Column(String)
    user = relationship("UserGroup", back_populates="group")  
    type = Column(String)
    admin = Column(Integer)  
    
class TeamInvite(SQLAlchemyBase):
    __tablename__ = "team_invite"
    invite_id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey("group.group_id"))  # Links to the Team
    sender_id = Column(Integer)
    recipient_id = Column(Integer)
    status = Column(String, default="pending")  # Pending, accepted 
    
class Message(SQLAlchemyBase):
    __tablename__ = "message"  
    message_id = Column(Integer, primary_key=True)
    chat_id = Column(Integer, ForeignKey("chat.chat_id"), nullable=False)
    message = Column(String)
    date_time = Column(String)
    sender_username = Column(String)
    sender_id = Column(Integer)
    
class Chat(SQLAlchemyBase): 
    __tablename__ = "chat"
    chat_id = Column(Integer, primary_key=True)
    group_id = Column(Integer)
    message = relationship("Message", backref="chat")

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
    floor_type = Column(String, nullable=False)
    jersey_colors = Column(String, nullable=False)
    group_id = Column(Integer, nullable=False)
    chat_id = Column(Integer, nullable=False)
    
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
    # name: Column(String, nullable=False)
    street_address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    events = relationship("EventBase", backref="address")
    
