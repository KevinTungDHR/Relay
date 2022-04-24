import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../app/assets/images/relay_blue_orange.svg'
import CloseIcon from '../../../app/assets/images/xmark-solid.svg'
class SideNavMenu extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { sideNavVisible, toggleSideNav } = this.props


    return(
      <div className={sideNavVisible ? 'side-nav-container' : 'side-nav-container hidden'}>
        <div className='sideNav-header'>
          <div className='sideNav-relay-logo'>
            <Logo viewBox="50 0 623 255"/>
          </div>
          <div className='sideNav-close-icon' onClick={toggleSideNav}>
            <CloseIcon />
          </div>
        </div>
        <div className='sideNav-links'>
          <Link to='/features'>Features</Link>
          <Link to='/solutions'>Solutions</Link>
          <Link to='/enterprise'>Enterprise</Link>
          <Link to='/resources'>Resources</Link>
          <Link to='/pricing'>Pricing</Link>
        </div>
      </div>
    )
  }
}

export default SideNavMenu