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
        <button className='btn secondary-btn medium-btn' onClick={logout}>Log out</button>
        <NavLink className='btn primary-btn large-btn' to='/client'>Launch Relay</NavLink>
      </div>
    ) : (
      <div className='session-nav-links'>
        <NavLink to='/signin'>Sign in</NavLink>
        <NavLink className='btn secondary-btn medium-btn' to='/signup'>Sign up</NavLink>
        <span className='btn primary-btn medium-btn' onClick={this.demoLogin}>Demo Login</span>
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