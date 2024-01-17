from fastapi import APIRouter, Depends
from typing import Annotated
from ..dependencies import oauth2_scheme, get_db

from ..crud.ruleset_crud import *

router = APIRouter()

# * get /user/ruleset/ 
# * gets all user rulesets


@router.get("/user/ruleset/", response_model=list[UserRuleset])
def get_users_rulesets(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

     return crud_get_user_ruleset(db, skip=skip, limit=limit)
 
# * get /rulesets/ 
# * gets all rulesets 

@router.get("/rulesets/", response_model=list[Ruleset])
def get_rulesets(token: Annotated[str, Depends(oauth2_scheme)], skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_rulesets(db, skip=skip, limit=limit)

# * get /rulesets/{ruleset_id} 
# * gets one ruleset by id

@router.get("/rulesets/{ruleset_id}", response_model=Ruleset)
def get_ruleset(token: Annotated[str, Depends(oauth2_scheme)], ruleset_id:int, db: Session = Depends(get_db)):
    
    return crud_get_ruleset_by_id(db, ruleset_id=ruleset_id)