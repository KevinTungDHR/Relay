import React from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsSliders } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa"

class ClientNav extends React.Component {
  constructor(props){
    super(props)
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
  render(){
    return(
      <nav className='client-top-nav'>
        <div className="client-left-nav-container">
          <button className='client-nav-history-button'>
            <AiOutlineClockCircle className='client-nav-icon'/>
          </button>
        </div>
        <div className='client-mid-nav-container'>
          <button className='search-btn search-container' onClick={this.showModal("search-modal")}>
            <span>Search App Academy</span>
            <div >
              <FiSearch className='client-nav-search-icon'/>
            </div>
          </button>
          <div className='client-nav-search-filters'>
            <BsSliders />
          </div>
        </div>
        <div className='client-right-nav-container'>
          <div className='client-nav-profile-pic'>
            <FaUser className='client-nav-icon'/>
          </div>
        </div>
      </nav>
    )
  }
}

export default ClientNav;