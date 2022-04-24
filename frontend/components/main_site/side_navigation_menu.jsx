import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../../app/assets/images/relay_blue_orange.svg'
import CloseIcon from '../../../app/assets/images/xmark-solid.svg'
class SideNavMenu extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    if(e.target.nodeName === 'A'){
      this.props.toggleSideNav()
    }
  }

  render(){
    const { sideNavVisible, toggleSideNav } = this.props


    return(
      <div className={sideNavVisible ? 'side-nav-container' : 'side-nav-container hidden'}>
        <div className='sideNav-header'>
          <NavLink onClick={toggleSideNav} to='/' className='sideNav-relay-logo'>
            <Logo viewBox='0 0 623 200'/>
          </NavLink>
          <div className='sideNav-close-icon' onClick={toggleSideNav}>
            <CloseIcon />
          </div>
        </div>
        <div onClick={this.handleClick} className='sideNav-links'>
            <Link to='/features'>Features</Link>
            <Link to='/solutions'>Solutions</Link>
            <Link to='/enterprise'>Enterprise</Link>
            <Link to='/resources'>Resources</Link>
            <Link to='/pricing'>Pricing</Link>
        </div>
        <section className='sideNav-footer'>
          <div className='sideNav-button-container'>
            <NavLink className='secondary-button'to='/signin'>
              SIGN IN
            </NavLink>
            <NavLink className='primary-button' to='/signup'>
                TRY FOR FREE
            </NavLink>
          </div>
        </section>
      </div>
    )
  }
}

export default SideNavMenu