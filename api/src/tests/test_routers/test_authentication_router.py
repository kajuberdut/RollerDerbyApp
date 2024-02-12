from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.user_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# pytest api/src/tests/test_routers/test_authentication_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency

def test_login():
    user = client.post(
        "/users",
        json={
            "email": "test_user1@example.com", 
            "password": "test_password1",
            "username": "test_user1", 
            "userId": 0
        }
    )
    
    response = client.get(
        "/login/1"
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    print('************************************')
    print("data", data)
    print('************************************')
    
    assert data ==  {
                        "userId": 1, 
                        "username": "test_user1", 
                        "email": "test_user1@example.com", 
                        "facebookName": None, 
                        "about": None, 
                        "primaryNumber": None, 
                        "level": None, 
                        "ruleset": [], 
                        "position": [], 
                        "insurance": [], 
                        "locationId": None, 
                        "associatedLeagues": None, 
                        "phoneNumber": None, 
                        "firstName": None, 
                        "lastName": None, 
                        "additionalInfo": None, 
                        "secondaryNumber": None
                    }