import React from 'react';
import { HiChevronDown, HiOutlinePencilAlt } from 'react-icons/hi'
import StaticSidebarList from './static_sidebar_list';
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsSliders, BsImage } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

class ClientSidebarIndex extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    this.props.fetchSignedinWorkspaces()
      .then(res=> console.log(res))
    this.props.fetchWorkspace(27)
  }

  render(){
    return(
      <>
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

          <section className='c-workspace-sidebar'>
            <header className='c-workspace-sidebar-header'>
              <button className='c-ws-sidebar-header-detail-btn'>
                <span className='c-ws-sidebar-header-text'>App Academy</span>
                <HiChevronDown />
              </button>
              <button className='c-ws-sidebar-header-new-message-btn'>
                <HiOutlinePencilAlt className='new-message-pencil-icon'/>
              </button>
            </header>
            <StaticSidebarList />
          </section>
      </>
    )
  }
}

export default ClientSidebarIndex;