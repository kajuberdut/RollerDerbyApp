
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")

POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_HOST = os.environ.get("POSTGRES_HOST")

DB_URL = os.environ.get("DB_URL")

# * starting engine inside of docker 
# engine = create_engine(DB_URL, pool_size=10, max_overflow=0)

# *correct engine below for starting it outside of docker 
engine = create_engine(f'{POSTGRES_HOST}://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5432/roller_derby_db', pool_size=10, max_overflow=0)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

SQLAlchemyBase = declarative_base()

# create all tables 
def create_all_tables():
    SQLAlchemyBase.metadata.create_all(bind=engine)


