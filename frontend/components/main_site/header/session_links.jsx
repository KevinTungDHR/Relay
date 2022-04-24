import React from 'react';
import { Link } from 'react-router-dom';

class SessionLinks extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='session-nav-links'>
        <Link to='/signin'>Sign in</Link>
        <Link to='/signup'>TRY FOR FREE</Link>
      </div>
    )  
  }
}

export default SessionLinks