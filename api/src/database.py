from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from os import environ 


DATABASE_URL = environ.get("DB_URL")

# This should be the line that connects my database just not sure what the actual URL Should be???? 
engine = create_engine(DATABASE_URL, echo=True)

# Create a metadata instance -- ptr example
metadata = MetaData()

# Define a new table with a name, columns, and types ptr example
metadata = MetaData()
test_table = Table('test_table', metadata,
                   Column('id', Integer, primary_key=True),
                   Column('name', String(50))
                   )

# Create the table in the database ptr example
metadata.create_all(engine)

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()