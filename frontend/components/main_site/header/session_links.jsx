import React from 'react';
import { NavLink } from 'react-router-dom';

class SessionLinks extends React.Component {
  constructor(props){
    super(props)
    this.demoLogin = this.demoLogin.bind(this)
  }

  demoLogin(e){
    e.preventDefault()
    this.props.login({
      email: "JimHalpert@DunderMifflin.com",
      password: "demouserpassword"
    })
  }

  render(){
    const { currentUser, logout } = this.props
    const userLinks = currentUser ? (
      <div className='session-nav-links loggedin-links'>
        <button className='secondary-button loggedin-session-buttons' onClick={logout}>Log out</button>
        <NavLink className='primary-button loggedin-session-buttons' to='/client'>Launch Relay</NavLink>
      </div>
    ) : (
      <div className='session-nav-links'>
        <NavLink to='/signin'>Sign in</NavLink>
        <NavLink className='secondary-button header-session-buttons' to='/signup'>Sign up</NavLink>
        <span className='primary-button header-session-buttons' onClick={this.demoLogin}>Demo Login</span>
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