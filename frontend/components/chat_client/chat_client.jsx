import React from 'react';
import { HiChevronDown, HiOutlinePencilAlt } from 'react-icons/hi'
import { IoChatbubblesOutline, IoEllipsisVertical } from "react-icons/io5";
import { BsChatText } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { VscMention } from 'react-icons/vsc'

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
    const view = document.querySelector(".client-grid")
    view.style.cursor = cursorType
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
      const profile = document.querySelector(".c-workspace-profile");

      const sideBarWidth = leftDragging ? e.clientX : sidebar.clientWidth
      const profileWidth = rightDragging ? view.clientWidth - e.clientX : profile.clientWidth

      const cols = [
        sideBarWidth, 
        3, 
        view.clientWidth - 6 - sideBarWidth - profileWidth,
        3,
        profileWidth
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
            <div className='c-workspace-sidebar-list'>

            </div>
          </section>

          <div id="leftDragging" className='left-dragbar' onMouseDown={this.startDrag}></div>
          
          <div className='client-primary-view'></div>

          <div id="rightDragging" className='right-dragbar' onMouseDown={this.startDrag}></div>

          <section className='c-workspace-profile'>
          </section>
         
        </div>
      </div>
    )
  }
}

export default ChatClient;