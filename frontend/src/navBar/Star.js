import React from 'react';

/**
 * Display star image
 *
 */

function Star() {

  /** Render star */

    return (
      <div className='star'>
      <img src="/star.png" alt="Star Icon" style={{zIndex: '3', marginRight: '7px', height: '60px'}}/>
      {/* <div href="/" style={{marginLeft: '70px', fontSize: '20px', position: 'absolute'}}><b>Block Party</b></div> */}
      </div>

    ) 
  }


export default Star