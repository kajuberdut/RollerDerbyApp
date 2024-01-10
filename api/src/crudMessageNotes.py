def get_chat_history(db: Session):
    """Retrieves chat history between a user and specified recipients."""

    # Query for relevant messages, joining tables as needed
    messages = (
        db.execute(
            # select(
            #     # models.UserMessage.user_id,
            #     models.Message.message_id,
            #     models.Message.message,
            #     models.Message.date_time,
            # )
            db.query(
                models.UserMessage.sender_id,
                models.Message.message_id,
                models.Message.message,
                models.Message.date_time,
                models.UserMessage.recipient_ids
            )
            # .limit(10)
            # .join(models.UserMessage.user)
            # .join(models.UserMessage.message)
            # .filter(
            #     or_(
            #         (models.UserMessage.user_id == user_id) & models.User.user_id.in_(recipient_ids),
            #         (models.UserMessage.user_id.in_(recipient_ids)) & (models.User.user_id == user_id),
            #     )
            # )
            # .order_by(models.Message.date_time.asc())  # Order messages chronologically
        )
    ).all()
    
    
    
    def get_chat_history(db: Session):
    """Retrieves chat history between a user and specified recipients."""
    print("hitting get_chat_history in CRUD.py")
     # Query for relevant messages, joining tables as needed
    # messages = (
    #     db.execute(
    #         db.query(
    #             # models.UserMessage.sender_id,
    #             models.Message.message_id,
    #             models.Message.message,
    #             models.Message.date_time,
    #             # models.UserMessage.recipient_ids
    #         )
    #     )
    # ).all()
    messages = (
        db.query(models.Message, models.User, models.UserMessage.recipient_ids)
        .join(models.UserMessage, models.UserMessage.message_id == models.Message.message_id)  # Join with UserMessage
        .join(models.User, models.User.user_id == models.UserMessage.sender_id)  # Join with User
        # .filter(models.Message.id == 0)  # Filter by message ID
        # .filter(Message.sender_id == 3)  # Filter by sender ID
        # .filter(User.id.in_([1]))  # Filter by recipient IDs
        # .order_by(Message.date_time)
        .all()
    )

    # print("messages in get chat history CRUD.py", messages)
    # print("messages[0] in get chat history CRUD.py", messages[0])
    # print("!!!!!!!!!!!!!!!!!!messages[0][0].message in get chat history CRUD.py", messages[0][0].message)
    # print("!!!!!!!!!!!!!!!!!!messages[0][0].message_id in get chat history CRUD.py", messages[0][0].message_id)
    # print("!!!!!!!!!!!!!!!!!!messages[0][0].date_time in get chat history CRUD.py", messages[0][0].date_time)
    # print("!!!!!!!!!!!!!!!!!!messages[0][1].user_id in get chat history CRUD.py", messages[0][1].user_id)
    
    message_objects = []
    
    for message, sender, recipient_ids in messages:
        # print(f"Message ID: {message.message_id}")
        # print(f"Sender ID: {sender.user_id}")
        # print(f"Recipient IDs: {recipient_ids}")
        # print(f"message: {message.message}")
        # print(f"date_time: {message.date_time}")
        
        # message_object = schemas.MessageObject(
        #     message_id=message.message_id,
        #     sender_id=sender.user_id,
        #     recipient_ids=recipient_ids,
        #     message=message.message,
        #     date_time=message.date_time
        # )
        
        message_object = {
            "message_id": message.message_id,
            "sender_id": sender.user_id,
            "recipient_ids": recipient_ids,
            "message": message.message,
            "date_time": message.date_time
        }
        message_objects.append(message_object)
    
    print("!!!!!!!!!!!!!!! message_objects !!!!!!!!!!!!:", message_objects)
        
        
        
    
    # ! things to note
    # ? this is not listing them ordered correctly as its trying to do it by number so will need to figure that out 
    # ? adding models.UserMessage.user_id is duplicating all the messages. 
    
    print(" *************************************** messages in crud.py get chat history:", messages)
# ! messages is returning this 
# ! {'sender_id': 1, 'message_id': 0, 'content': 'hey there', 'timestamp': '1/9/2024, 1:45:45 PM'}
    # Convert query results to list of dictionaries
    # chat_history = [
    #     {"sender_id": row[0], "message_id": row[1], "message": row[2], "date_time": row[3]}
    #     for row in messages
    # ]
    # *this is returning the correct information now.... but you will need to see if you need a recipient_id in here as well
    # print("chat_history in crud.py **********************************************", len(chat_history))
    # return chat_history
    return message_objects