from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.team_invite_crud_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# adding -s flag allows prints to console
# pytest api/src/tests/test_routers/test_address_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency

# def test_create_address():
#     response = client.post(
#         "/address",
#         json={
   
#             # "address": {
#                 "address_id": 0,
#                 "street_address": "000 this address", 
#                 "city": "Test City", 
#                 "state": "CO", 
#                 "zip_code": "12345"
#             # }  
#               }
    
#     )
    
#     assert response.status_code == 422, response.text
#     data = response.json()
#     print("****************************************")
#     print("data", data)
#     print("****************************************")