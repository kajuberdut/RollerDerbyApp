import pytest
from fastapi.testclient import TestClient

from sqlalchemy.orm import sessionmaker

from .dependencies import oauth2_scheme
from .routers.address_router import router

client = TestClient(router)
# client = TestClient()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @pytest.fixture
# def get_db_mock():
#     fake_address_db = {
#     "address": {"address_id": 1, "street_address": "111 Testing St", "city": "Cheyenne", "state": "WY", "zip _code": "11111"},
#      "address": {"address_id": 2, "street_address": "222 Testing St", "city": "Denver", "state": "CO", "zip _code": "22222"},
#     }
#     session = sessionmaker()
#     session.configure(bind=fake_address_db)
#     yield session
#     session.close()
    # return fake_address_db

@pytest.fixture
def oauth2_scheme_mock():
    return lambda: True

# def create_test_client(db: Iterable[dict]) -> TestClient:
#     test_api_app = create_app(db=db)  # Assuming you have a `create_app` function
#     return TestClient(test_api_app)