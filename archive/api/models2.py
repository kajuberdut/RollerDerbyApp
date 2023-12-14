
class Position(SQLAlchemyBase):
    __tablename__ = "position"  
    position_id = Column(Integer, primary_key=True)
    jammer = Column(Boolean)
    blocker = Column(Boolean)
    pivot = Column(Boolean)
    user = relationship("UserPosition", back_populates="position")

class Insurance(SQLAlchemyBase):
    __tablename__ = "insurance"  
    insurance_id = Column(Integer, primary_key=True)
    WFTDA = Column(String)
    USARS = Column(String)
    other = Column(String)
    user = relationship("UserInsurance", back_populates="insurance")

class Location(SQLAlchemyBase):
    __tablename__ = "location"

    location_id = Column(Integer, primary_key=True)
    city = Column(String)
    state = Column(String)    
    user = relationship("UserLocation", back_populates="location")
    
class Ruleset(SQLAlchemyBase):
    __tablename__ = "ruleset"

    ruleset_id = Column(Integer, primary_key=True)
    WFTDA: Column(Boolean)
    USARS: Column(Boolean)  
    banked_track: Column(Boolean)
    short_track: Column(Boolean) 
    user = relationship("UserRuleset", back_populates="ruleset") 
    
class User(SQLAlchemyBase):
    __tablename__ = "user"
    # ! note other user items are already in user table 
    
    first_name = Column(String)
    last_name = Column(String)
    facebook_name = Column(String)
    about = Column(String)
    primary_number = Column(Integer)
    secondary_number = Column(Integer)
    level = Column(String)
    insurance = relationship("UserInsurance", back_populates="user")
    location = relationship("UserLocation", back_populates="user")
    associated_leagues = Column(String)
    ruleset = relationship("UserRuleset", back_populates="user")
    position = relationship("UserPosition", back_populates="user")
    # associated_leagues = relationship("UserLeagueAssociation", back_populates="user")
    
    # ! it may be more efficient to have played rulesets and maybe associated leagues in a table? Check that out later. 
    
    class UserRuleset(SQLAlchemyBase):
    __tablename__ = "user_ruleset"

    user_id = Column(String, ForeignKey("user.user_id"), primary_key=True)
    ruleset_id = Column(Integer, ForeignKey("ruleset.ruleset_id"), primary_key=True)
    user = relationship("User", back_populates="ruleset")
    ruleset = relationship("Ruleset", back_populates="user")
    # users = relationship("Users", backref="rulesets")
    # ruleset = relationship("Rulesets")
    
class UserPosition(SQLAlchemyBase):
    __tablename__ = "user_position"

    user_id = Column(String, ForeignKey("user.user_id"), primary_key=True)
    position_id = Column(Integer, ForeignKey("position.position_id"), primary_key=True)
    user = relationship("User", back_populates="position")
    position = relationship("Position", back_populates="user")
    
class UserInsurance(SQLAlchemyBase):
    __tablename__ = "user_insurance"

    user_id = Column(String, ForeignKey("user.user_id"), primary_key=True)
    insurance_id = Column(Integer, ForeignKey("insurance.insurance_id"), primary_key=True)
    user = relationship("User", back_populates="insurance")
    insurance = relationship("Insurance", back_populates="user")
    # user = relationship("User", backref="insurance")
    # insurance = relationship("Insurance")

    
    
class UserLocation(SQLAlchemyBase):
    __tablename__ = "user_location"

    user_id = Column(String, ForeignKey("user.user_id"), primary_key=True)
    location_id = Column(Integer, ForeignKey("location.location_id"), primary_key=True)
    user = relationship("User", back_populates="location")
    location = relationship("Location", back_populates="user")
    # user = relationship("User", backref="location")
    # location = relationship("Location")

# class UserLeagueAssociation(Base):
#     __tablename__ = "user_league_associations"

#     user_id = Column(String, ForeignKey("users.user_id"), primary_key=True)
#     league_id = Column(Integer, ForeignKey("leagues.league_id"), primary_key=True)
#     user = relationship("User", backref="associated_leagues")
#     league = relationship("League")
    
        # items = relationship("Item", back_populates="owner") 
        
        
class Address(SQLAlchemyBase):
    __tablename__ = "address"

    address_id = Column(Integer, primary_key=True)
    street_address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    
    
class Event(SQLAlchemyBase):
    __tablename__ = "event"
    # ! note other user items are already in Event table 
    address_id = Column(Integer, ForeignKey("address.id"), nullable=False)
    jersey_colors = Column(String)
    ruleset = Column(String)



# ****************NOTES BELOW THIS ******************
# from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship


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
    