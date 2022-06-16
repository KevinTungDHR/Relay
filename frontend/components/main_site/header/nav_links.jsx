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
          <a href='#'>Portfolio</a>
          <a href='https://www.linkedin.com/in/kevintungdev/' rel='noreferrer' target="_blank">LinkedIn</a>
          <a href='https://github.com/KevinTungDHR' rel='noreferrer' target="_blank">GitHub</a>
          <a href='#'>AngelList</a>
        </div>
        <SessionLinksContainer />
      </nav>
    )  
  }
}

export default NavLinks