from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from os import environ


# Database configuration
DATABASE_URL = environ.get("DB_URL")

# Create an engine instance
engine = create_engine(DATABASE_URL, echo=True)

# Create a metadata instance
metadata = MetaData()

# Define a new table with a name, columns, and types
test_table = Table('test_table', metadata,
                   Column('id', Integer, primary_key=True),
                   Column('name', String(50))
                   )

# Create the table in the database
metadata.create_all(engine)