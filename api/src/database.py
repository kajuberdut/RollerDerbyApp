
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
from os import environ 

# * starting engine inside of docker 
# engine = create_engine('postgresql://postgres:changedpass@db:5432/roller_derby_db')

# *correct engine below for starting it outside of docker 
engine = create_engine('postgresql://postgres:changedpass@localhost:5432/roller_derby_db')

print("Engine", engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

print("SessionLocal", SessionLocal)

SQLAlchemyBase = declarative_base()
# Base = sqlalchemy.orm.declarative_base()
# # Create all tables after models are defined

print("SQLAlchemyBase", SQLAlchemyBase)

# create all tables 
def create_all_tables():
    SQLAlchemyBase.metadata.create_all(bind=engine)


print("You have made it through the database file")

