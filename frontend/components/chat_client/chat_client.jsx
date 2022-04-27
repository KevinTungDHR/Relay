import React from 'react';
import { HiChevronDown, HiOutlinePencilAlt } from 'react-icons/hi'
import StaticSidebarList from './static_sidebar_list';
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsSliders, BsImage } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import ProfileSidebar from './profile_sidebar';
class ChatClient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      leftDragging: false,
      rightDragging: false
    }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.endDrag = this.endDrag.bind(this)
  }

  displayCursor(cursorType){
    const view = document.querySelector(".client-grid");
    view.style.cursor = cursorType;
  }

  startDrag(e){
    this.setState({
      [e.target.id]: true
    })

    this.displayCursor("ew-resize")
  }

  endDrag(){
    this.setState({
      leftDragging: false,
      rightDragging: false
    })

    this.displayCursor("auto")
  }

  onDrag(e){
    const { leftDragging, rightDragging } = this.state

    if (leftDragging || rightDragging) {
      e.preventDefault();
      const view = document.querySelector(".client-grid");
      const sidebar = document.querySelector(".c-workspace-sidebar");
      const rightside = document.querySelector(".c-workspace-rightside");

      const sideBarWidth = leftDragging ? e.clientX : sidebar.clientWidth
      const rightsideWidth = rightDragging ? view.clientWidth - e.clientX : rightside.clientWidth

      const cols = [
        sideBarWidth, 
        3, 
        view.clientWidth - 6 - sideBarWidth - rightsideWidth,
        3,
        rightsideWidth
      ]

      const newTemplate = cols.map(col => col.toString() + "px").join(" ");
      view.style.gridTemplateColumns = newTemplate;
    }
  }

  render(){
    return(
      <div className='client-container' onMouseUp={this.endDrag}>
        <div className='client-grid' onMouseMove={this.onDrag}>

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

          <div id="leftDragging" className='left-dragbar' onMouseDown={this.startDrag}></div>
          
          <div className='client-primary-view'></div>

          <div id="rightDragging" className='right-dragbar' onMouseDown={this.startDrag}></div>

          <section className='c-workspace-rightside'>
            <ProfileSidebar />
          </section>
         
        </div>
      </div>
    )
  }
}

export default ChatClient;