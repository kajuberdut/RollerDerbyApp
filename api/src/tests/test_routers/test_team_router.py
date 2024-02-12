from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.team_invite_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# adding -s flag allows prints to console
# pytest api/src/tests/test_routers/test_team_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency

def test_get_team_form_by_admin_id_team_id():
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
    
    team = client.post(
        "/groups/teams",
        json={
            "groupId": 0,
            "name": "New Team Name",
            "type": "team",
            "admin": admin_data["userId"]
        }
    )
    
    team_data = team.json()
    
    response = client.get(
        f"/teams/{team_data['groupId']}/form/{team_data['admin']}"    
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    
    assert data == {'url': 'http://localhost:8000/static/New Team Name.xlsx'}
    