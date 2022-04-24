import React from 'react';
import { Link } from 'react-router-dom';
import SessionLinks from './session_links';

class NavLinks extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <nav className='header-nav-link-container'>
        <div className='business-nav-links'>
          <Link to='/features'>Features</Link>
          <Link to='/solutions'>Solutions</Link>
          <Link to='/enterprise'>Enterprise</Link>
          <Link to='/resources'>Resources</Link>
          <Link to='/pricing'>Pricing</Link>
        </div>
        <SessionLinks />
      </nav>
    )  
  }
}

export default NavLinks