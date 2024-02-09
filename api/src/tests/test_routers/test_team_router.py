from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.team_invite_crud_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# adding -s flag allows prints to console
# pytest api/src/tests/test_routers/test_address_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency


# ! not function as of yet. Will need to add a group with this

def test_get_team_form_by_admin_id_team_id():
    response = client.post(
        "/group",
        json={
            
        }
    )
    
    assert response.status_code == 422, response.text
    data = response.json()
    print("****************************************")
    print("data", data)
    print("****************************************")