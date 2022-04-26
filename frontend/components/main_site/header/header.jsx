import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from './menu_icon';
import NavLinks from './nav_links';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches: window.matchMedia("(min-width: 1085px)").matches,
      navClass: 'header-container'
    }
  }

  componentDidMount(){
    const sizeHandler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 1085px)").addEventListener('change', sizeHandler);
    // window.addEventListener('scroll', this.stickyNavBar)
  }

  // Refactor to maybe use redux store to display this sidenav


  render(){
    const { toggleSideNav, currentUser } = this.props

    const whiteLinks = currentUser && 
      this.props.location.pathname === '/' ? "white-links" : ""
    
    const logo = currentUser && 
      this.props.location.pathname === '/' ? window.images.relayWhite : window.images.relayBlueOrange
    return(
      <div className={this.state.navClass}>
        <nav className="nav-bar">
          <NavLink to='/' className='header-relay-logo'>
            <img src={logo}/>
          </NavLink>
          {!this.state.matches && <MenuIcon toggleSideNav={toggleSideNav}/> }
          {this.state.matches && <NavLinks whiteLinks={whiteLinks}/>}
        </nav>
      </div>
    )
  }
}

export default Header;