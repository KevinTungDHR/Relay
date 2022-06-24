import React from 'react';
import { FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

class SessionLinks extends React.Component {
  constructor(props){
    super(props)
    this.demoLogin = this.demoLogin.bind(this)
  }

  componentDidMount(){
    this.props.fetchPendingWorkspaces();
  }

  demoLogin(e){
    e.preventDefault()
    this.props.login({
      email: "DemoUser@gmail.com",
      password: "demouserpassword"
    })
  }

  renderLinks(){
    const { workspaces,currentUser } = this.props
    const primaryBtn = currentUser && this.props.location.pathname === '/' ? 'btn inverted-btn large-btn' : 'btn primary-btn large-btn'

    if(workspaces.length > 0){
      return <NavLink className={primaryBtn} to={`/client/${workspaces[0].id}`}>Launch Relay</NavLink>
    } else {
      return <NavLink className={primaryBtn} to='/get-started'>Launch Relay</NavLink>
    }
  }
  render(){
    const { currentUser, logout } = this.props
    const secondaryBtn = currentUser && this.props.location.pathname === '/' ? 'btn inverted-secondary-btn medium-btn' : 'btn secondary-btn medium-btn'
    const userLinks = currentUser ? (
      <div className='session-nav-links loggedin-links'>
        <div className='session-notifications-icon-container'>
          <FaBell className='session-notifications-icon' />
          {Object.values(this.props.pendingWorkspaces).length !== 0 && <div className='session-notifications-icon-red-circle'></div>}
        </div>
        <button className={secondaryBtn} onClick={logout}>Log out</button>
        {this.renderLinks()}
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