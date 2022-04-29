import React from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsSliders, BsImage } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

class ClientNav extends React.Component {
  constructor(props){
    super(props)
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
          <button className='search-btn search-container'>
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
            <BsImage className='client-nav-icon'/>
          </div>
        </div>
      </nav>
    )
  }
}

export default ClientNav;