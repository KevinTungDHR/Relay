import React from 'react';
import { NavLink, Link } from 'react-router-dom';
class SideNavMenu extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick(e){
    if(e.target.nodeName === 'A'){
      this.props.toggleSideNav()
    }
  }

  handleLogout(){
    this.props.logout()
      .then(() => this.props.toggleSideNav())
  }

  render(){
    const { sideNavVisible, toggleSideNav, currentUser } = this.props

    const buttons = currentUser ? (
      <div className='sideNav-button-container'>
        <button className='btn secondary-btn full-width-btn' onClick={this.handleLogout}>Log out</button>
        <NavLink className='btn primary-btn full-width-btn' to='/client'>
          Launch Relay
        </NavLink>
      </div>
    ) : (
      <div className='sideNav-button-container'>
        <NavLink className='btn secondary-btn full-width-btn'to='/signin'>
          SIGN IN
        </NavLink>
        <NavLink className='btn primary-btn full-width-btn' to='/signup'>
          SIGN UP
        </NavLink>
      </div>
    )

    return(
      <div className={sideNavVisible ? 'side-nav-container' : 'side-nav-container hide-side-nav'}>
        <div className='sideNav-header'>
          <NavLink onClick={toggleSideNav} to='/' className='sideNav-relay-logo'>
            <img src={window.images.relayRGB} alt="relay-logo"/>
          </NavLink>
          <div className='sideNav-close-icon' onClick={toggleSideNav}>
            <img src={window.images.xmark} alt='close-icon'/>
          </div>
        </div>
        <div onClick={this.handleClick} className='sideNav-links'>
          <a href='#'>Portfolio</a>
          <a href='https://www.linkedin.com/in/kevintungdev/' rel='noreferrer' target="_blank">LinkedIn</a>
          <a href='https://github.com/KevinTungDHR' rel='noreferrer' target="_blank">GitHub</a>
          <a href='#'>AngelList</a>
        </div>
        <section className='sideNav-footer'>
          {buttons}
        </section>
      </div>
    )
  }
}

export default SideNavMenu