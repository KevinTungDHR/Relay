import React from 'react';
import { Link } from 'react-router-dom';

class SessionLinks extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { currentUser, logout } = this.props
    const userLinks = currentUser ? (
      <div className='session-nav-links'>
        <button onClick={logout}>Log out</button>
        <Link to='/client'>Launch Relay</Link>
      </div>
    ) : (
      <div className='session-nav-links'>
        <Link to='/signin'>Sign in</Link>
        <Link to='/signup'>TRY FOR FREE</Link>
      </div>
    )

    return (
      <>
        {userLinks}
      </>
    )  
  }
}

export default SessionLinks