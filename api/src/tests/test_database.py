# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from fastapi.testclient import TestClient
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.pool import StaticPool

# from ..database import SQLAlchemyBase
# from ..main import api_app
# from ..dependencies import get_db


# POSTGRES_DATABASE_URL = "postgresql://"

# engine = create_engine(
#     POSTGRES_DATABASE_URL,
#     # connect_args={"check_same_thread": False},
#     poolclass=StaticPool,
# )

# TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# SQLAlchemyBase.metadata.create_all(bind=engine)

# def override_get_db():
#     try:
#         db = TestingSessionLocal()
#         yield db
#     finally:
#         db.close()
        
# api_app.dependency_overrides[get_db] = override_get_db

# client = TestClient(api_app)


# def test_get_one_address():

#         response = client.get("/address/1", headers={"Authorization": "Bearer some_token"})

#         print("response!!! ", response)
#         print("response.json()!!! ", response.json())
  
#         assert response.status_code == 200
#         assert response.json() == {
#             "address_id": 1,
#             "street_address": "111 Testing St",
#             "city": "Cheyenne",
#             "state": "WY",
#             "zip_code": "11111"
#         }