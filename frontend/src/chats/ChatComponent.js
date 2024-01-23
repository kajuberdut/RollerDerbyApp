import React, { useState, useEffect }  from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./ChatComponent.css"

  /**  
  * Card component for chat 
  */

  function ChatComponent({handleChat, chat}) {

    const [username, setUsername] = useState(); 

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      // setUserId(user.userId);
      setUsername(user.username)
 
    }, []);

    /** If no chat return return empty component */

    if(!chat) {
      return <></>
    }

    console.log("**************************************")
    console.log("Chat!!!!!", chat)
    console.log("chat type of :", typeof chat.name)
    console.log("**************************************")

    let key = chat.chatId;


    function formatName() {
     
      let nwName; 

      if(chat.name.includes('& ' + username)) {
        nwName = chat.name.replace('& ' + username, " ")
        } 
        
      if(chat.name.includes(username + ' &')) {
        nwName = chat.name.replace(username + ' &', " ")
      }

        if(nwName) {
          return nwName
        }
        return chat.name
      } 

      let frmNm = formatName();

     /** Render the chat component */
      
      return (
          <section key={"ChatComponent-" + key} style={{paddingTop: '10px'}}>
            <Card className="ChatComponent" onClick={() => handleChat(key)}> 
              <CardBody>
                <CardTitle className="text-center CardComponent-Title">
                  { frmNm && <h3>{frmNm}</h3> }
                </CardTitle>
              </CardBody>
            </Card>
         </section>
        );
  }
  
  export default ChatComponent
