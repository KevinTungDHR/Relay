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
      rightDragging: false,
      showSecondary: false
    }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = myThrottle(this.onDrag.bind(this), 5);
    this.endDrag = this.endDrag.bind(this)
    this.handleWindowResize = myThrottle(this.handleWindowResize.bind(this), 5)
  }

  componentDidMount(){
    this.props.fetchWorkspace(this.props.match.params.workspaceId)
    this.props.fetchSignedinWorkspaces()
      .then(res=> console.log(res))
  
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

  onDrag(e){
    const { leftDragging, rightDragging } = this.state

    if (leftDragging || rightDragging) {
      e.preventDefault();
      const view = document.querySelector(".client-grid");
      const sidebar = document.querySelector(".c-workspace-sidebar");
      const leftBar = document.querySelector(".left-dragbar");
      const rightside = document.querySelector(".c-workspace-rightside");

      let sideBarWidth = leftDragging ? e.clientX : sidebar.clientWidth
      sideBarWidth = sideBarWidth > 600 ? 600 : sideBarWidth
      leftBar.style.left = (sideBarWidth - 4).toString() + "px"

      if (rightside){
        let rightsideWidth = rightDragging ? view.clientWidth - e.clientX : rightside.clientWidth
        rightsideWidth = rightsideWidth <= 309 ? 309 : rightsideWidth
        rightsideWidth = rightsideWidth > 999 ? 999 : rightsideWidth
        const rightBar = document.querySelector(".right-dragbar");
        rightBar.style.right = (rightsideWidth - 4).toString() + "px"
        view.style.gridTemplateColumns =  `${sideBarWidth}px auto ${rightsideWidth}px`;
      } else {
        view.style.gridTemplateColumns = `${sideBarWidth.toString()}px auto`
      }
    }
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

  

  renderSecondary(){
    if (this.state.showSecondary){
      return (
        <>
          <div id="rightDragging" className='right-dragbar' onMouseDown={this.startDrag}></div>
          <section className='c-workspace-rightside'>
            <ProfileSidebar />
          </section>
        </>
      )
    } else {
      return null
    }
  }

  render(){
    const { showSecondary } = this.state
    const gridClassList = showSecondary ? 'client-grid secondary-view-open' : 'client-grid'
    return(
      <div className='client-container' onMouseUp={this.endDrag} >
        <ClientNav />
        <div className={gridClassList} onMouseMove={this.onDrag}>
          <ClientSidebarIndexContainer />
          <div id="leftDragging" className='left-dragbar' onMouseDown={this.startDrag}></div>
          
          <div className='client-primary-view'></div>
          {this.renderSecondary()}
        </div>
      </div>
    )
  }
}

export default ChatClient;