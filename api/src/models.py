
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
    
class User(Base):
    __tablename__ = "users"
    
    user_id = Column(String, primary_key=True, index=True)
    derby_name = Column(String, unique=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    about = Column(String)
    location = Column(String)
    level = Column(String)
    facebook_name = Column(String)
    played_rulesets = relationship("UserRulesetAssociation", back_populates="user")
    associated_leagues = relationship("UserLeagueAssociation", back_populates="user")
    
class UserRulesetAssociation(Base):
    __tablename__ = "user_ruleset_associations"

    user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
    ruleset_id = Column(Integer, ForeignKey("rulesets.ruleset_id"), primary_key=True)
    user = relationship("User", backref="played_rulesets")
    ruleset = relationship("Ruleset")

class UserLeagueAssociation(Base):
    __tablename__ = "user_league_associations"

    user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
    league_id = Column(Integer, ForeignKey("leagues.league_id"), primary_key=True)
    user = relationship("User", backref="associated_leagues")
    league = relationship("League")
    
        # items = relationship("Item", back_populates="owner")