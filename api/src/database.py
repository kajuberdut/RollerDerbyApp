
# * previous version
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base
from os import environ 


# Import your models
# from .models import User, UserRulesetAssociation, UserLeagueAssociation

# raise ValueError("I AM AN ERROR THERE ARE NO LOGS!!!!")


# DATABASE_URL = environ.get("DB_URL")

# raise ValueError("DatabaseURL", DATABASE_URL)
# print("DatabaseURL", DATABASE_URL)

# engine = create_engine(DATABASE_URL)

# engine = create_engine(DATABASE_URL, echo=False)

# engine = create_engine('postgresql://postgres:changedpass@db:5432/roller_derby_db')
# this seems like its the correct database because of not getting errors. 
# I am going to try and run in it in localhost not in docker but leave database running in docker 
# This one the last error I get inside the logs for api is You have made it through the database file 
# It doesnt print anything else as far as errors go  

# *correct engine below for starting it outside fo docker 
engine = create_engine('postgresql://postgres:changedpass@localhost:5432/roller_derby_db')
# this does not seem to be working starting it up from inside of docke which makes sense because we have localhost in there 
# note that this worked outside of docker.... 
# crud.py is running
# main.py is running
 

# engine = create_engine('postgresql://postgres:changedpass@db:5432/<roller_derby_db>')
#! important the < > do not belong in the database url
# port 5432 failed: FATAL:  database "<roller_derby_db>" does not exist

# engine = create_engine('postgresql://postgres:<changedpass>@db:5432/<roller_derby_db>')
# port 5432 failed: FATAL:  password authentication failed for user "postgres"

# engine = create_engine("postgresql://postgres:changedpass@localhost:5432/roller_derby_db", echo=False)

# engine = create_engine("postgresql://postgres:<changedpass>@localhost:5432/<roller_derby_db>", echo=False)

print("Engine", engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

print("SessionLocal", SessionLocal)

Base = declarative_base()
# Base = sqlalchemy.orm.declarative_base()
# # Create all tables after models are defined

print("Base", Base)

# create all tables 
def create_all_tables():
    Base.metadata.create_all(bind=engine)


print("You have made it through the database file")

# * everything below this is my old code which made a mock table. Try to get new code up and running.
# This should be the line that connects my database just not sure what the actual URL Should be???? 
# engine = create_engine(DATABASE_URL, echo=True)

# Create a metadata instance -- ptr example
# metadata = MetaData()

# Define a new table with a name, columns, and types ptr example
# metadata = MetaData()
# test_table = Table('test_table', metadata,
#                    Column('id', Integer, primary_key=True),
#                    Column('name', String(50))
#                    )

# Create the table in the database ptr example
# metadata.create_all(engine)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()