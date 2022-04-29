import React from 'react';
// import { GrClose } from "react-icons/gr";
import ClientNav from './client_nav';
import ClientSidebarIndexContainer from './client_sidebar_index_container';
import ProfileSidebar from './profile_sidebar';
import { myThrottle } from '../../util/util_functions';
class ChatClient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      leftDragging: false,
      rightDragging: false
    }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = myThrottle(this.onDrag.bind(this), 5);
    this.endDrag = this.endDrag.bind(this)
    this.handleWindowResize = myThrottle(this.handleWindowResize.bind(this), 5)
  }

  componentDidMount(){
    window.addEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize(e) {
    e.preventDefault();
    const view = document.querySelector(".client-grid");
    const sidebar = document.querySelector(".c-workspace-sidebar");
    const rightside = document.querySelector(".c-workspace-rightside");
    const leftBar = document.querySelector(".left-dragbar");
    const rightBar = document.querySelector(".right-dragbar");

    const sideBarWidth = sidebar.clientWidth
    const rightsideWidth = rightside.clientWidth

    const cols = [
      sideBarWidth, 
      view.clientWidth - sideBarWidth - rightsideWidth,
      rightsideWidth
    ]

    leftBar.style.left = (sideBarWidth - 4).toString() + "px"
    rightBar.style.right = (rightsideWidth - 4).toString() + "px"
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
      const leftBar = document.querySelector(".left-dragbar");
      const rightBar = document.querySelector(".right-dragbar");

      let sideBarWidth = leftDragging ? e.clientX : sidebar.clientWidth
      let rightsideWidth = rightDragging ? view.clientWidth - e.clientX : rightside.clientWidth
      sideBarWidth = sideBarWidth > 600 ? 600 : sideBarWidth
      rightsideWidth = rightsideWidth <= 309 ? 309 : rightsideWidth
      rightsideWidth = rightsideWidth > 999 ? 999 : rightsideWidth
    
      leftBar.style.left = (sideBarWidth - 4).toString() + "px"
      rightBar.style.right = (rightsideWidth - 4).toString() + "px"

      view.style.gridTemplateColumns =  `${sideBarWidth}px auto ${rightsideWidth}px`;
    }
  }

  render(){
    return(
      <div className='client-container' onMouseUp={this.endDrag} >
        <ClientNav />
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