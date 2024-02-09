from ...main import api_app
from ...dependencies import get_db, get_and_validate_current_user
from ...crud.address_crud import *
from ..test_database import override_get_db, client, override_dependency

# run file in venv
# adding -s flag allows prints to console
# pytest api/src/tests/test_routers/test_address_router.py -vv -s

api_app.dependency_overrides[get_db] = override_get_db
api_app.dependency_overrides[get_and_validate_current_user] = override_dependency

def test_create_address():
    response = client.post(
        "/address",
        json={
                "street_address": "555 Main St", 
                "city": "Boise", 
                "state": "ID", 
                "zip_code": "55555"
        }
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    
    assert data == 1
    
    
def test_get_all_address():
    response = client.get(
        "/address",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data[0] == {
                "addressId": 1,
                "streetAddress": "555 Main St", 
                "city": "Boise", 
                "state": "ID", 
                "zipCode": "55555"
            }

def test_get_specific_address():
    response = client.get(
        "/address/1",
    )
    
    assert response.status_code == 200, response.text
    data = response.json()
    assert data == {
                "addressId": 1,
                "streetAddress": "555 Main St", 
                "city": "Boise", 
                "state": "ID", 
                "zipCode": "55555"
            }

