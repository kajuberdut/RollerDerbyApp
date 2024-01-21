import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./ChatComponent.css"

  /**  
  * Card component for chat 
  */

  function ChatComponent({handleChat, chat}) {

    /** If no chat return return empty component */

    if(!chat) {
      return <></>
    }

    console.log("Chat!!!!!", chat)
    console.log("chat type of :", typeof chat.name)

    let key = chat.chatId;

     /** Render the chat component */
      
      return (
          <section key={"ChatComponent-" + key} style={{paddingTop: '10px'}}>
            <Card className="ChatComponent" onClick={() => handleChat(key)}> 
              <CardBody>
                <CardTitle className="text-center CardComponent-Title">
                  { chat.name && <h3>{chat.name}</h3> }
                </CardTitle>
              </CardBody>
            </Card>
         </section>
        );
  }
  
  export default ChatComponent
