import React from 'react';
// import { GrClose } from "react-icons/gr";
import ClientSidebarIndexContainer from './client_sidebar_index_container';
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
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize(e) {
    e.preventDefault();
    const view = document.querySelector(".client-grid");
    const sidebar = document.querySelector(".c-workspace-sidebar");
    const rightside = document.querySelector(".c-workspace-rightside");

    const sideBarWidth = sidebar.clientWidth
    const rightsideWidth = rightside.clientWidth

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
      <div className='client-container' onMouseUp={this.endDrag} >
        <div className='client-grid' onMouseMove={this.onDrag}>
          <ClientSidebarIndexContainer />
          
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