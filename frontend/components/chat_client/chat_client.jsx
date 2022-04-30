import React from 'react';
// import { GrClose } from "react-icons/gr";
import ClientNav from './client_nav';
import ProfileSidebar from './profile_sidebar';
import { myThrottle } from '../../util/util_functions';
import { Redirect } from 'react-router';
import ClientSidebarContainer from './client_sidebar_container';
import { SidebarAddChannelModal } from './modals/sidebar_add_channel_modal';
class ChatClient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      leftDragging: false,
      rightDragging: false,
      showSecondary: true,
      isLoading: true,
      notAuthorized: false
    }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = myThrottle(this.onDrag.bind(this), 5);
    this.endDrag = this.endDrag.bind(this)
    this.handleWindowResize = myThrottle(this.handleWindowResize.bind(this), 5)
  }

  componentDidMount(){
    this.props.fetchSignedinWorkspaces()
    window.addEventListener('click', (e) =>{
      if(e.target.className == 'modal'){
        this.props.hideModal();
      }
    })
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentDidUpdate(prevProps){
    const { workspaces } = this.props
    const id = this.props.match.params.workspaceId
    
    if (prevProps.history !== this.props.history){
      this.props.fetchSignedinWorkspaces()
    }
    if(!(Object.keys(workspaces).includes(id))){
      this.setState({ notAuthorized: true})
    }

    if (prevProps.workspaces !== this.props.workspaces){
      this.props.fetchWorkspace(id)
        .then(() => this.setState({isLoading: false}))
    }

    // NEED TO CHECK if prevProps.channels/subscriptions are the same
    // then this.setState({isLoading: false})
  }

  handleWindowResize(e) {
    e.preventDefault();
    const view = document.querySelector(".client-grid");
    const sidebar = document.querySelector(".c-workspace-sidebar");
    const leftBar = document.querySelector(".left-dragbar");
    const rightside = document.querySelector(".c-workspace-rightside");

    const sideBarWidth = sidebar.clientWidth
    leftBar.style.left = (sideBarWidth - 4).toString() + "px"


    if(rightside) {
      const rightsideWidth = rightside.clientWidth
      const rightBar = document.querySelector(".right-dragbar");
      rightBar.style.right = (rightsideWidth - 4).toString() + "px"
      view.style.gridTemplateColumns =  `${sideBarWidth}px auto ${rightsideWidth}px`;
    } else {
      view.style.gridTemplateColumns = `${sideBarWidth.toString()}px auto`
    }
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

  renderModal(){
    if(!this.props.modal) {
      return null;
    }

    const { name, posX, posY } = this.props.modal
    return (
      <div>
      <SidebarAddChannelModal posY={posY} posX={posX} modalOpen={name === 'channel-header-add-channel'}/>
      <SidebarAddChannelModal posY={posY} posX={posX - 200} modalOpen={name === 'channel-footer-add-channel'}/>
      </div>
    )
  }

  render(){
    if (this.state.notAuthorized){
      return <Redirect to='/'/>
    }
    if(this.state.isLoading){
      return <div>Loading...</div>
    }
    const { showSecondary } = this.state
    const gridClassList = showSecondary ? 'client-grid secondary-view-open' : 'client-grid'
    return(
      <div className='client-container' onMouseUp={this.endDrag} >
        <ClientNav />
        <div className={gridClassList} onMouseMove={this.onDrag}>
          <ClientSidebarContainer workspace={this.props.currentWorkspace}/>
          <div id="leftDragging" className='left-dragbar' onMouseDown={this.startDrag}></div>
          
          <div className='client-primary-view'></div>
          {this.renderSecondary()}
        </div>
        {this.renderModal()}
        
      </div>
    )
  }
}

export default ChatClient;