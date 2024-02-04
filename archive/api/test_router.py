

# ! this is how you authenticate the route ------ 

@router.get("/users/me")
async def read_own_items(

    current_user: Annotated[UserBase, Depends(get_and_validate_current_user)]
):
    return [{"item_id": "Foo", "owner": "Sophia"}]
