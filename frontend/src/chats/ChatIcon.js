import React, { Component } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
// import { star} from "@fortawesome/free-solid-svg-icons"
import "./ChatIcon.css";

function ChatIcon() {
    return (
    <div className='ChatIcon' role="ChatIcon">
      {/* <FontAwesomeIcon icon={faCommentAlt} style={{fontSize: '25px', marginRight: '7px'}}/> */}
      <FontAwesomeIcon icon={faCommentAlt} className='ChatIcon-Icon'/>
      {/* <FontAwesomeIcon icon={Star} style={{fontSize: '50px'}}/> */}

    </div>
    ) 
  }


export default ChatIcon