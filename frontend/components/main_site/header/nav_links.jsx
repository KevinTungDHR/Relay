import React from 'react';
import { Link } from 'react-router-dom';
import SessionLinksContainer from './session_links_container';

class NavLinks extends React.Component {
  constructor(props){
    super(props)
  }

  render(){


    return (
      <nav className='header-nav-link-container' >
        <div className={`business-nav-links ${this.props.whiteLinks}`}>
          <Link to='/features'>Features</Link>
          <Link to='/solutions'>Solutions</Link>
          <Link to='/enterprise'>Enterprise</Link>
          <Link to='/resources'>Resources</Link>
          <Link to='/pricing'>Pricing</Link>
        </div>
        <SessionLinksContainer />
      </nav>
    )  
  }
}

export default NavLinks