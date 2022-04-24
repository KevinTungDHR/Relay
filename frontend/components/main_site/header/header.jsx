import React from 'react';
import Logo from '../../../../app/assets/images/relay_blue_orange.svg'
import MenuIcon from './menu_icon';
import NavLinks from './nav_links';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches: window.matchMedia("(min-width: 1085px)").matches
    }
  }

  componentDidMount(){
    const sizeHandler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 1085px)").addEventListener('change', sizeHandler);
  }

  // Refactor to maybe use redux store to display this sidenav

  render(){
    const { toggleSideNav } = this.props
    return(
      <div className='header-container'>
        <nav className="nav-bar">
          <div className='header-relay-logo'>
            <Logo viewBox="0 0 623 255"/>
          </div>
          {!this.state.matches && <MenuIcon toggleSideNav={toggleSideNav}/> }
          {this.state.matches && <NavLinks />}
        </nav>
      </div>
    )
  }
}

export default Header;