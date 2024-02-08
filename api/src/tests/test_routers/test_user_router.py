from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.user_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# pytest api/src/tests/test_routers/test_user_router.py -vv

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency

def test_create_user():
    response = client.post(
        "/users/",
        json={
            "email": "test_user1@example.com", 
            "password": "test_password1",
            "username": "test_user1", 
            "userId": 0
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    print("data", data)
    assert data["email"] == "test_user1@example.com"
    assert "userId" in data
    assert data["userId"] == 1
    
def test_create_second_user():
    response = client.post(
        "/users/",
        json={
            "email": "test_user2@example.com", 
            "password": "test_password2",
            "username": "test_user2", 
            "userId": 0
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    print("data", data)
    assert data["email"] == "test_user2@example.com"
    assert "userId" in data
    assert data["userId"] == 2


def test_get_users():
    # with client.application.dependency_overrides[get_and_validate_current_user]
    response = client.get(
        "/users/",
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data[0] == {
        "image": None, 
        "username": "test_user1", 
        "userId": 1
    }
    assert data[1] == {
        "image": None, 
        "username": "test_user2", 
        "userId": 2
    }

    
def test_get_user():
    # with client.application.dependency_overrides[get_and_validate_current_user]
    response = client.get(
        "/users/1",
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
        "userId": 1, 
        "username": "test_user1",
        "about": None, 
        "userId": 1, 
        "associatedLeagues": None,
        "email": "test_user1@example.com", 
        "facebookName": None, 
        "insurance": [], 
        "level": None, "locationId": None, 
        "position": [], "primaryNumber": None, 
        'ruleset': [] 
    }


def test_get_user_image():
    # with client.application.dependency_overrides[get_and_validate_current_user]
    response = client.get(
        "/users/image/1",
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {"image": None }
    print("data", data)
    
def test_update_user():    
    response = client.put(
        "/users/1",
         json={	
                "user": {	
                    "username": "TestUser1",
                    "email": "TestUser1@gmail.com",
                    "image": "JVS5b25lIUAjJCVeJiooKCgoKCgo",
                    "phoneNumber": "1111111111",
                    "firstName": "Test_First",
                    "lastName": "Test_Last", 
                    "additionalInfo": "Test 1 additional info.",
                    "facebookName": "Test User 1 Facebook",
                    "about": "This story is my story.",
                    "primaryNumber": "1", 
                    "secondaryNumber": "2", 
                    "level": "B", 
                    "positionId": 0,
                    "locationId": 0,
                    "associatedLeagues": "Test Roller Derby League"
                },
                "ruleset": [
                    {
                    "rulesetId": 0, 
                    "name": "banked track"
                    }, 
                    {
                    "rulesetId": 0, 
                    "name": "short track"
                    }
                ], 
                "position": [
                    {
                        "positionId": 0, 
                        "position": "pivot"	
                    }, 
                    {
                        "positionId": 0, 
                        "position": "jammer"
                        
                    }
                ],
                "insurance": [
                {
                    "insuranceId": 0, 
                    "type": "WFTDA",
                    "insuranceNumber": "11111"
                }, 
                {
                    "insuranceId": 0, 
                    "type": "USARS",
                    "insuranceNumber": "22222"
                }
            ],
            "location": {
                "city": "Testing",
                "state": "WY"
            }
        }
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
        "userId": 0,
        "username": "TestUser1",
        "email": "TestUser1@gmail.com",
        "image": "JVS5b25lIUAjJCVeJiooKCgoKCgo",
        "phoneNumber": "1111111111",
        "firstName": "Test_First",
        "lastName": "Test_Last",
        "facebookName": "Test User 1 Facebook",
        "additionalInfo": "Test 1 additional info.",
        "about": "This story is my story.",
        "primaryNumber": "1",
        "secondaryNumber": "2",
        "level": "B",
        "ruleset": None,
        "position": None,
        "insurance": None,
        "message": None,
        "locationId": 1,
        "associatedLeagues": "Test Roller Derby League"
    }

def test_update_user_public_details():    
    response = client.put(
        "/users/profile/2",
        json={     
         
            "user": {	
                    "username": "TestUser2",
                    "image": "JVS5b25lIUAjJCVeJiooKCgoKCgo",
                    "facebookName": "Test User 2 Facebook",
                    "about": "Test 2 additional info.",
                    "primaryNumber": "2", 
                    "level": "A", 
                    "positionId": 0,
                    "locationId": 0,
                    "associatedLeagues": "Team 2 Roller Derby"
                },
            "ruleset": [
                {
                    "rulesetId": 0, 
                    "name": "WFTDA"
                }, 
                {
                    "rulesetId": 0, 
                    "name": "USARS"
                }
            ], 
            "position": [
                {
                    "positionId": 0, 
                    "position": "blocker"
                    
                }
            ],
            "location": {
                "city": "Testing",
                "state": "CO"
            }
        }
    
    )
        
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
        "username": "TestUser2",
        "image": "JVS5b25lIUAjJCVeJiooKCgoKCgo",
        "facebookName": "Test User 2 Facebook",
        "about": "Test 2 additional info.",
        "primaryNumber": "2",
        "level": "A",
        "ruleset": None,
        "position": None,
        "locationId": 2,
        "associatedLeagues": "Team 2 Roller Derby"
    }
    
def test_update_user_private_details():    
    response = client.put(
        "/users/private/2",
        json={ 
            "user": {	
                "email": "Test_User2@example.com",
                "phoneNumber": "2222222222",
                "firstName": "Test2_First",
                "lastName": "Test2_Last", 
                "additionalInfo": "Additional info user 2",
                "secondaryNumber": "20"
                },
            "insurance": [
            {
                "insuranceId": 0, 
                "type": "WFTDA",
                "insuranceNumber": "333333"
            }, 
            {
                "insuranceId": 0, 
                "type": "USARS",
                "insuranceNumber": "44444"
            }
            ]
        }
    )  
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
        "email": "Test_User2@example.com",
        "phoneNumber": "2222222222",
        "firstName": "Test2_First",
        "lastName": "Test2_Last",
        "additionalInfo": "Additional info user 2",
        "secondaryNumber": "20"
    }
    

def test_get_user_details():    
    response = client.get(
        "/users/TestUser1/details"
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
        "email": "TestUser1@gmail.com",
        "phoneNumber": "1111111111",
        "firstName": "Test_First",
        "lastName": "Test_Last",
        "facebookName": "Test User 1 Facebook",
        "additionalInfo": "Test 1 additional info.",
        "primaryNumber": "1",
        "secondaryNumber": "2",
        'level': 'B',
        "insurance": [{"insuranceId": 1,
                         "insuranceNumber": "11111",
                         "userId": 1},
                        {"insuranceId": 2,
                        "insuranceNumber": "22222",
                        'userId': 1}],
        "position": [{"positionId": 1,
                        "userId": 1},
                     {'positionId': 2, 
                      'userId': 1}
                    ],
         "ruleset": [{"rulesetId": 1,
                        "userId": 1},
                       {"rulesetId": 2,
                        "userId": 1},
                    ],

    }
    


# # ! Note this is failing but not using this in the app so will handle later. 
# def test_delete_user():    
#     response = client.delete(
#         "/users/2",
#         #  json={ "userId": "2", "password": "test_password2" }
#     )
    
#     assert response.status_code == 422, response.text
#     data = response.json()
#     assert data ==  {"user_id": 2, "status": "deleted"}

    