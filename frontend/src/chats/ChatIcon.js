import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./ChatIcon.css";

/**  
 * Display chat icon page
 */

function ChatIcon() {

    /** render chat icon page */

    return (
    <div className='ChatIcon' role="ChatIcon">
        <FontAwesomeIcon icon={faCommentAlt} className='ChatIcon-Icon'/>
    </div>
    ) 
  }


export default ChatIcon