from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
# from ...crud.team_invite_crud_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# adding -s flag allows prints to console
# pytest api/src/tests/test_routers/test_group_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency


def test_create_team():
    admin = client.post(
        "/users",
        json={
            "email": "user1@example.com", 
            "password": "password1",
            "username": "User1", 
            "userId": 0
        }
    )
    
    admin_data = admin.json()
    
    response = client.post(
        "/groups/teams",
        json={
            "groupId": 0,
            "name": "New Team Name",
            "type": "team",
            "admin": admin_data["userId"]
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
            "groupId": 1, 
            "name": "New Team Name", 
            "type": "team", 
            "admin": admin_data["userId"]
        }

def test_add_user_to_group():
    user = client.post(
        "/users",
        json={
            "email": "user2@example.com", 
            "password": "password2",
            "username": "User2", 
            "userId": 0
        }
    )
   
    user_data = user.json()
    
    response = client.post(
        "/groups",
        json={
            "groupId": 1, 
            "userId" : user_data["userId"]
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
                "groupId": 1, 
                "userId": 2
            }
    
#todo test this later when you add chats. 

# def test_get_group_name_by_chat_id():
#     response = client.get(
#         "/groups/group/name/{chat_id}",
#     )
    
#     assert response.status_code == 422, response.text
#     data = response.json()
#     print("****************************************")
#     print("data", data)
#     print("****************************************")

def test_get_teams_by_user_id():
    response = client.get(
        "/groups/teams/1",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == [{"groupId": 1, "name": "New Team Name"}]
    
def test_get_group_by_group_id():
    response = client.get(
        "/groups/1",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {"admin": 1, "groupId": 1, "name": "New Team Name", "participants": ["User1", "User2"]}
    

# ! Sending json to deletes routes is discourged 
# ! Testing this doesnt work becuase it wont accept json. 
# ! Can cleanup later to test and not json which means you would have to do it through parameters 

# def test_delete_user_from_group():
#     response = client.delete(
#         "/groups",
#         json= {
#                 "groupId": 1, 
#                 "username": "User2"
#             }
#     )
    
#     assert response.status_code == 200, response.text
#     data = response.json()
    
#     group = client.get(
#         "/groups/1",
#     )
    
#     assert group.status_code == 200, group.text
#     group_data = group.json()
#     assert group_data == {"admin": 1, "groupId": 1, "name": "New Team Name", "participants": ["User1"]}
