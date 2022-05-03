import React from 'react';
import { myThrottle } from '../../util/util_functions';
import { Redirect, Route, Switch } from 'react-router-dom';
import ClientNavContainer from './top_nav/client_nav_container';
import ClientSidebarContainer from './left_sidebar/client_sidebar_container';
import ChannelPrimaryView from './channel_viewer/channel_primary_view_container';
import ChannelBrowserContainer from './channel_browser/channel_browser_container';
import ProfileSidebar from './profile_sidebar/profile_sidebar';

import CreateChannelModalContainer from './modals/create_channel_modal_container';
import AddChannelModalContainer from './modals/add_channel_modal_container'
import ChannelOptionsModalContainer from './modals/channel_options_modal_container';
import SearchModalContainer from './modals/search_modal_container';

class ChatClient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      leftDragging: false,
      rightDragging: false,
      showSecondary: false,
      isLoading: true,
      notAuthorized: false
    }

    this.startDrag = this.startDrag.bind(this);
    this.onDrag = myThrottle(this.onDrag.bind(this), 5);
    this.endDrag = this.endDrag.bind(this)
    this.handleWindowResize = myThrottle(this.handleWindowResize.bind(this), 5)
  }

  componentDidMount(){
    const id = this.props.match.params.workspaceId

    this.props.fetchSignedinWorkspaces()
    this.props.fetchWorkspace(id)
        .then(() => this.setState({isLoading: false}))

    window.addEventListener('mousedown', (e) =>{
      if(e.target.classList.contains('modal')){
        this.props.hideModal();
      }
    })
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentDidUpdate(prevProps){
    const { workspaces } = this.props
    const id = this.props.match.params.workspaceId
    
    if (prevProps.history !== this.props.history){
      // When is this being called?
      this.props.fetchSignedinWorkspaces()

    }

    if(!(Object.keys(workspaces).includes(id))){
      this.setState({ notAuthorized: true})
    }

    if (prevProps.currentWorkspace && prevProps.currentWorkspace !== this.props.currentWorkspace){
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
    switch(name){
      case "channel-header-add-channel":
        return <AddChannelModalContainer posY={posY} posX={posX} modalOpen={name === 'channel-header-add-channel'}/>
      case "channel-footer-add-channel":
        return  <AddChannelModalContainer posY={posY} posX={posX - 200} modalOpen={name === 'channel-footer-add-channel'}/>
      case "create-channel-modal":
        return <CreateChannelModalContainer modalOpen={name === 'create-channel-modal'}/>
      case "channel-options-modal":
        return <ChannelOptionsModalContainer posY={posY} posX={posX} modalOpen={name === 'channel-options-modal'}/>
      case "search-modal":
        return <SearchModalContainer posX={posX} posY={posY} modalOpen={name === 'search-modal'}/>
      default:
        return null;
    }
  }

  render(){
    if (this.state.notAuthorized){
      return <Redirect to='/'/>
    }

    // On a refresh the children will mount once first so you need this in order to get all workspaces.
    if(this.state.isLoading){
      return <div></div>
    }
    const { showSecondary } = this.state
    const gridClassList = showSecondary ? 'client-grid secondary-view-open' : 'client-grid'
    return(
      <div className='client-container' onMouseUp={this.endDrag} >
        <ClientNavContainer />
        <div className={gridClassList} onMouseMove={this.onDrag}>
          <ClientSidebarContainer workspace={this.props.currentWorkspace}/>
          <div id="leftDragging" className='left-dragbar' onMouseDown={this.startDrag}></div>
          
          <div className='client-primary-view'>
            <Switch>
              <Route path='/client/:workspaceId/browse-channels' component={ChannelBrowserContainer}/>
              <Route path='/client/:workspaceId/:channelId' component={ChannelPrimaryView}/>
            </Switch>
          </div>
          {this.renderSecondary()}
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

export default ChatClient;