from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from ..database import SQLAlchemyBase
from ..main import api_app
from ..dependencies import get_db, get_and_validate_current_user

from ..crud.user_crud import *

# run file in venv
# pytest api/src/tests/test_app.py

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

SQLAlchemyBase.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()
        
api_app.dependency_overrides[get_db] = override_get_db


client = TestClient(api_app)

async def override_dependency(q: str | None = None):
    return {"q": q, "skip": 5, "limit": 10}

api_app.dependency_overrides[get_and_validate_current_user] = override_dependency
