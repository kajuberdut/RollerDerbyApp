from fastapi import APIRouter, Depends
from ..dependencies import get_and_validate_current_user, get_db

from ..crud.ruleset_crud import *

router = APIRouter(
    prefix="/rulesets",
    tags=["rulesets"],
    dependencies=[Depends(get_and_validate_current_user)],
)

 
# * get /rulesets
# * gets all rulesets 

@router.get("/", response_model=list[Ruleset])
def get_rulesets(limit: int = 100, db: Session = Depends(get_db)):
    
    return crud_get_rulesets(db=db, limit=limit)

# * get /rulesets/{ruleset_id} 
# * gets one ruleset by id

@router.get("/{ruleset_id}", response_model=Ruleset)
def get_ruleset(ruleset_id:int, db: Session = Depends(get_db)):
    
    return crud_get_ruleset_by_id(db=db, ruleset_id=ruleset_id)

# * get /rulesets/users/ 
# * gets all user rulesets
# ? testing only

@router.get("/users", response_model=list[UserRuleset])
def get_users_rulesets(limit: int = 100, db: Session = Depends(get_db)):

     return crud_get_user_ruleset(db=db, limit=limit)