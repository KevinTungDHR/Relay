import React from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa"
import { NavLink } from 'react-router-dom';

class ClientNav extends React.Component {
  constructor(props){
    super(props)

    this.openProfile = this.openProfile.bind(this);
  }

  showModal(name){
    return e => {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const modal = {
        name: name,
        posX: left - 100,
        posY: top
      }
      this.props.showModal(modal);
    }
  }

  openProfile(){
    const { sessionId } = this.props;
    const { pathname } = this.props.location
    const cleanPath = pathname.split("/").slice(0,4).join("/")
    const newPath = `${cleanPath}/user_profile/${sessionId}`
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath)
    }
  }

  render(){
    return(
      <nav className='client-top-nav'>
        <div className="client-left-nav-container">
          <NavLink to='/' className='client-left-nav-logo'>
            <img src={window.images.relayWhite} />
          </NavLink>
        </div>
        <div className='client-mid-nav-container'>
          <button className='search-btn search-container' onClick={this.showModal("search-modal")}>
            <span>Search {this.props.workspaces[this.props.workspaceId].name}</span>
            <div >
              <FiSearch className='client-nav-search-icon'/>
            </div>
          </button>
        </div>
        <div className='client-right-nav-container'>
          <div onClick={this.openProfile} className='client-nav-profile-pic'>
            <FaUser className='client-nav-icon'/>
          </div>
        </div>
      </nav>
    )
  }
}

export default ClientNav;