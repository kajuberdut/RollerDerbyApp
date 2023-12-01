from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
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

    user_id = Column(UUID, ForeignKey("users.user_id"), primary_key=True)
    ruleset_id = Column(Integer, ForeignKey("rulesets.ruleset_id"), primary_key=True)
    user = relationship("User", backref="played_rulesets")
    ruleset = relationship("Ruleset")

class UserLeagueAssociation(Base):
    __tablename__ = "user_league_associations"

    user_id = Column(UUID, ForeignKey("users.user_id"), primary_key=True)
    league_id = Column(Integer, ForeignKey("leagues.league_id"), primary_key=True)
    user = relationship("User", backref="associated_leagues")
    league = relationship("League")


    # items = relationship("Item", back_populates="owner")