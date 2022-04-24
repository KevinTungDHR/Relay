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
        <ul className='sideNav-links'>
          <li>
            <Link to='/features'>Features</Link>
          </li>
          <li>
            <Link to='/solutions'>Solutions</Link>
          </li>
          <li>
            <Link to='/enterprise'>Enterprise</Link>
          </li>
          <li>
            <Link to='/resources'>Resources</Link>
          </li>
          <li>
            <Link to='/pricing'>Pricing</Link>
          </li>
        </ul>
        <section className='sideNav-footer'>
          <ul className='sideNav-button-container'>
            <li className='secondary-button'>
              <Link to='/signin'>Sign in</Link>
            </li>
            <li className='primary-button'>
              <Link to='/signup'>Try for free</Link>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

export default SideNavMenu