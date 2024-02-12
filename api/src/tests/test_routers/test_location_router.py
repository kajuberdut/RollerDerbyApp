from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.user_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# pytest api/src/tests/test_routers/test_location_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency



def test_get_locations():
    user = client.post(
        "/users/",
        json={
            "email": "test_user1@example.com", 
            "password": "test_password1",
            "username": "test_user1", 
            "userId": 0
        }
    )
        
    updated_user = client.put(
        "/users/1",
         json={	
                "user": {	
                    "username": "TestUser1",
                    "email": "TestUser1@gmail.com",
                    "image": "JVS5b25lIUAjJCVeJiooKCgoKCgo",
                    "phoneNumber": "1111111111",
                    "firstName": "",
                    "lastName": "", 
                    "additionalInfo": "",
                    "facebookName": "",
                    "about": "",
                    "primaryNumber": "1", 
                    "secondaryNumber": "2", 
                    "level": "", 
                    "positionId": 0,
                    "locationId": 0,
                    "associatedLeagues": ""
                },
                "ruleset": [
                ], 
                "position": [
                ],
                "insurance": [
                ],
                "location": {
                    "city": "Testing",
                    "state": "WY"
                }
        }
    )

    response = client.get(
        "/locations",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data[0] == {
                "locationId": 1,
                "city": "Testing", 
                "state": "WY"
            }
    
def test_get_location():

    response = client.get(
        "/locations/1",
    )
    assert response.status_code == 200, response.text
    data = response.json()
    
    assert data == {
            "locationId": 1,
            "city": "Testing", 
            "state": "WY"
        }
    