from fastapi.testclient import TestClient
from ...routers.address_router import router

from fastapi import Depends
from typing import Annotated
from unittest.mock import Mock
from sqlalchemy.orm import Session

# from ..test_utils import get_db_mock
# from ..test_utils import oauth2_scheme_mock

# client = TestClient(router)
# from ..test_utils import client
from sqlalchemy.orm import sessionmaker
import pytest

from ...database import SessionLocal
from ...main import api_app


# ! The good news is, this aapears to be working besides pulling from the wrong database

client = TestClient(api_app)


@pytest.fixture
def oauth2_scheme_mock():
    return lambda: True


@pytest.fixture
def mocked_session():
    print("hitting the mocked_session")
    mock_session = Mock()
    mock_session.query().filter_by(addressId=1).first.return_value = {
        "addressId": 1,
        "streetAddress": "111 Testing St",
        "city": "Test1",
        "state": "WY",
        "zipCode": "11111"
    }
    return mock_session
        
# ! above was uncommented 
# ! This test is passing but it is getting data from the actual database which means it will fail with the database changes 

# def test_get_one_address(Session = Depends(get_db_mock) ):
def test_get_one_address(db: Session = Depends(mocked_session)):
        response = client.get("/address/1", headers={"Authorization": "Bearer some_token"})
        print("db in test_gets_one_address:", db)

        assert response.status_code == 200
        assert response.json() == {
            "addressId": 1,
            "streetAddress": "3908 Robitaille Court",
            "city": "Cheyenne",
            "state": "WY",
            "zipCode": "82001"
        }
        
        
# def test_ping():
#     response = client.get("/address")
#     assert response.status_code == 200
#     assert response.json() == {"ping": "pong!"}

# @pytest.fixture(scope="module")
# def get_db_mock():
#     print("get_db_mock is getting hit")
#     fake_address_db = {
#     "address": {"address_id": 1, "street_address": "111 Testing St", "city": "Cheyenne", "state": "WY", "zip _code": "11111"},
#      "address": {"address_id": 2, "street_address": "222 Testing St", "city": "Denver", "state": "CO", "zip _code": "22222"},
#     }
#     session = SessionLocal()
#     session.configure(bind=fake_address_db)
#     print("session:", session)
#     yield session
#     session.close()
    
# def test_get_one_address():

#         response = client.get("/address/1", headers={"Authorization": "Bearer some_token"})
#         # print("get_mock_db in test:", get_mock_db)  
#         session = SessionLocal()
#         fake_address_db = {
#         "address": {"address_id": 1, "street_address": "111 Testing St", "city": "Cheyenne", "state": "WY", "zip _code": "11111"},
#         "address": {"address_id": 2, "street_address": "222 Testing St", "city": "Denver", "state": "CO", "zip _code": "22222"},
#         }
#         session.configure(bind=fake_address_db)
#         print("session:", session)
#         # yield session
#         print("Session in test:", session)

#         print("response!!! ", response)
#         print("response.json()!!! ", response.json())
#         # print("response!!! ", response['street_address'])
#         # print("response!!! ", response.street_address)
#         assert response.status_code == 200
#         assert response.json() == {
#             "address_id": 1,
#             "street_address": "111 Testing St",
#             "city": "Cheyenne",
#             "state": "WY",
#             "zip_code": "11111"
#         }

        
        
 # with client.override_dependencies(get_db_mock, oauth2_scheme=oauth2_scheme_mock):
        # response = client.get("/address/1", headers={"Authorization": "Bearer coneofsilence"})
        
        # fake_secret_token = "coneofsilence"


# @router.get("/events/", response_model=list[EventBase])
# def get_events(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     events = crud_get_events(db, skip=skip, limit=limit)
#     return events
