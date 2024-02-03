import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

/**
 * Display star page
 *
 */

function Star() {

  /** Render star */

    return (
    <div className='star'>
      <FontAwesomeIcon icon={faStar} style={{fontSize: '40px', marginRight: '7px'}}/>
    </div>
    ) 
  }


export default Star