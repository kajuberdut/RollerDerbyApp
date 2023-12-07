from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from os import environ 


# Import your models
# from .models import User, UserRulesetAssociation, UserLeagueAssociation

raise ValueError("I AM AN ERROR THERE ARE NO LOGS!!!!")


DATABASE_URL = environ.get("DB_URL")

# engine = create_engine(DATABASE_URL, echo=False)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base = declarative_base()

# # Create all tables after models are defined
# Base.metadata.create_all(bind=engine)
# User.metadata.create_all(bind=engine)

# * everything below this is my old code which made a mock table. Try to get new code up and running.
# This should be the line that connects my database just not sure what the actual URL Should be???? 
engine = create_engine(DATABASE_URL, echo=True)

# Create a metadata instance -- ptr example
metadata = MetaData()

# Define a new table with a name, columns, and types ptr example
# metadata = MetaData()
test_table = Table('test_table', metadata,
                   Column('id', Integer, primary_key=True),
                   Column('name', String(50))
                   )

# Create the table in the database ptr example
metadata.create_all(engine)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()