import React, { useState, useEffect }  from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./ChatComponent.css"

  /**  
  * Card component for chat 
  */

  function ChatComponent({handleChat, chat}) {

    
    const [username, setUsername] = useState(); 

    /** On mount, retrieve user from local storage and set username in state*/

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUsername(user.username)
 
    }, []);

    /** If no chat return return empty component */

    if(!chat) {
      return <></>
    }

    /** Setup key  */

    let key = chat.chatId;

    /** Format the name of chat to display accordingly  */

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
