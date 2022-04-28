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
      email: "DemoUser@gmail.com",
      password: "demouserpassword"
    })
  }

  render(){
    const { currentUser, workspaces, logout } = this.props
    const primaryBtn = currentUser && this.props.location.pathname === '/' ? 'btn inverted-btn large-btn' : 'btn primary-btn large-btn'
    const secondaryBtn = currentUser && this.props.location.pathname === '/' ? 'btn inverted-secondary-btn medium-btn' : 'btn secondary-btn medium-btn'
    const userLinks = currentUser ? (
      <div className='session-nav-links loggedin-links'>
        <button className={secondaryBtn} onClick={logout}>Log out</button>
        <NavLink className={primaryBtn} to={`/client/${workspaces[0].id}`}>Launch Relay</NavLink>
      </div>
    ) : (
      <div className='session-nav-links'>
        <NavLink to='/signin'>Sign in</NavLink>
        <NavLink className='btn secondary-btn medium-btn' to='/signup'>Sign up</NavLink>
        <span className='btn primary-btn large-btn' onClick={this.demoLogin}>Demo Login</span>
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