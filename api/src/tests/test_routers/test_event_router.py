from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.user_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# pytest api/src/tests/test_routers/test_event_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency

def test_create_bout():
    response = client.post(
        "/events/bouts",
        json={
            "bout": {
                "eventId": 0,
                "type": "bout", 
                "date": "2024-01-01", 
                "time": "17:00", 
                "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
                "theme": "Testing Theme", 
                "description": "blah blah blah", 
                "level": "B", 
                "coEd": True, 
                "ruleset": "WFTDA", 
                "jerseyColors": "white and green", 
                "floorType": "polished wood", 
                "opposingTeam": "Test Opposing Team", 
                "team": "Test Team", 
                "addressId": 0, 
                "groupId": 0,
                "chatId": 0
            },

            "address": {
                "streetAddress": "555 Main St", 
                "city": "Boise", 
                "state": "ID", 
                "zipCode": "55555"
            }
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
                "addressId": 1,
                "chatId": 1,
                "coEd": True,
                "date": "2024-01-01",
                "description": "blah blah blah",
                "eventId": 1,
                "floorType": "polished wood", 
                "groupId": 1,
                "jerseyColors": "white and green",
                "level": "B", 
                "type": "bout", 
                "time": "17:00", 
                "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
                "theme": "Testing Theme", 
                "ruleset": "WFTDA"
            }
    
def test_create_mixer():
    response = client.post(
        "/events/mixers",
        json={
            "mixer": {
                "eventId": 0,
                "type": "mixer", 
                "date": "2024-02-02", 
                "time": "17:00", 
                "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
                "theme": "Testing Mixer Theme", 
                "description": "blah blah blah", 
                "level": "All Levels", 
                "coEd": False, 
                "ruleset": "USARS", 
                "jerseyColors": "blue and pink", 
                "floorType": "concrete", 
                "signupLink": "www.signup.com",
                "addressId": 0, 
                "groupId": 0,
                "chatId": 0
            },

            "address": {
                "streetAddress": "666 Main St", 
                "city": "Cheyenne", 
                "state": "WY", 
                "zipCode": "666666"
            }
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
                "addressId": 2,
                "chatId": 2,
                "coEd": False,
                "date": "2024-02-02",
                "description": "blah blah blah",
                "eventId": 2,
                "floorType": "concrete", 
                "groupId": 2,
                "jerseyColors": "blue and pink",
                "level": "All Levels", 
                "type": "mixer", 
                "time": "17:00", 
                "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
                "theme": "Testing Mixer Theme", 
                "ruleset": "USARS"
            }
    
def test_get_all_events():
    response = client.get(
        "/events",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == [
        {
            "addressId": 1,
            "chatId": 1,
            "coEd": True,
            "date": "2024-01-01",
            "description": "blah blah blah",
            "eventId": 1,
            "floorType": "polished wood", 
            "groupId": 1,
            "jerseyColors": "white and green",
            "level": "B", 
            "type": "bout", 
            "time": "17:00", 
            "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
            "theme": "Testing Theme", 
            "ruleset": "WFTDA"
        },
        
        {
            "addressId": 2,
            "chatId": 2,
            "coEd": False,
            "date": "2024-02-02",
            "description": "blah blah blah",
            "eventId": 2,
            "floorType": "concrete", 
            "groupId": 2,
            "jerseyColors": "blue and pink",
            "level": "All Levels", 
            "type": "mixer", 
            "time": "17:00", 
            "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
            "theme": "Testing Mixer Theme", 
            "ruleset": "USARS"
        }
    ]
    
def test_get_all_bout_events():
    response = client.get(
        "/events/bout",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == [
        {
            "addressId": 1,
            "chatId": 1,
            "coEd": True,
            "date": "2024-01-01",
            "description": "blah blah blah",
            "eventId": 1,
            "floorType": "polished wood", 
            "groupId": 1,
            "jerseyColors": "white and green",
            "level": "B", 
            "type": "bout", 
            "time": "17:00", 
            "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
            "theme": "Testing Theme", 
            "ruleset": "WFTDA"
        }
    ]
    
def test_get_all_mixers_events():
    response = client.get(
        "/events/mixer",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == [
        {
            "addressId": 2,
            "chatId": 2,
            "coEd": False,
            "date": "2024-02-02",
            "description": "blah blah blah",
            "eventId": 2,
            "floorType": "concrete", 
            "groupId": 2,
            "jerseyColors": "blue and pink",
            "level": "All Levels", 
            "type": "mixer", 
            "time": "17:00", 
            "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
            "theme": "Testing Mixer Theme", 
            "ruleset": "USARS"
        }
    ]
    
def test_get_all_bouts():
    response = client.get(
        "/events/all/bouts",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == [
        {
            "addressId": 1,
            "chatId": 1,
            "coEd": True,
            "date": "2024-01-01",
            "description": "blah blah blah",
            "eventId": 1,
            "floorType": "polished wood", 
            "groupId": 1,
            "jerseyColors": "white and green",
            "level": "B", 
            "opposingTeam": "Test Opposing Team",
            "team": "Test Team",
            "type": "bout", 
            "time": "17:00", 
            "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
            "theme": "Testing Theme", 
            "ruleset": "WFTDA"
        }
    ]
    
def test_get_all_mixers():
    response = client.get(
        "/events/all/mixers",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == [
        {
            "addressId": 2,
            "chatId": 2,
            "coEd": False,
            "date": "2024-02-02",
            "description": "blah blah blah",
            "eventId": 2,
            "floorType": "concrete", 
            "groupId": 2,
            "jerseyColors": "blue and pink",
            "level": "All Levels", 
            "signupLink": "www.signup.com",
            "type": "mixer", 
            "time": "17:00", 
            "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
            "theme": "Testing Mixer Theme", 
            "ruleset": "USARS"
        }
    ]
    
# ! Note that is is not working but is not being used in application so will come back later when you add bouts and mixers
    
# def test_update_bout():
#     response = client.put(
#         "/events/bouts/1",
#         json={
#                 "type": "bout",
#                 "eventId": 1,
#                 "date": "2024-01-02", 
#                 "time": "17:00", 
#                 "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
#                 "theme": "New Updated Theme", 
#                 "description": "updated description", 
#                 "level": "A", 
#                 "coEd": False, 
#                 "ruleset": "WFTDA", 
#                 "jerseyColors": "white and black", 
#                 "floorType": "sport court", 
#                 "opposingTeam": "Update Opposing Team", 
#                 "team": "Update Team", 
#                 "addressId": 1, 
#                 # "groupId": 1,
#                 # "chatId": 1
#         }
#     )
    
#     assert response.status_code == 200, response.text
#     data = response.json()
#     assert data == [
#         {
#             "addressId": 1,
#             "chatId": 1,
#             "coEd": False,
#             "date": "2024-01-02",
#             "description": "updated description",
#             "eventId": 1,
#             "floorType": "sport court", 
#             "groupId": 1,
#             "jerseyColors": "white and black",
#             "level": "A", 
#             "opposingTeam": "Update Opposing Team",
#             "team": "Update Team",
#             "type": "bout", 
#             "time": "17:00", 
#             "timeZone": " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", 
#             "theme": "New Updated Theme", 
#             "ruleset": "WFTDA",
#             # "group_id": 1, 
#             # "chat_id": 1
#         }
#     ]