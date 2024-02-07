import React from 'react';

/**
 * Display star image
 *
 */

function Star() {

  /** Render star */

    return (
      <div className='star'>
      <img src="/star.png" alt="Star Icon" style={{zIndex: '100', marginRight: '7px', height: '60px', position: 'absolute', top: '5px'}}/>
      </div>
    ) 
  }


export default Star