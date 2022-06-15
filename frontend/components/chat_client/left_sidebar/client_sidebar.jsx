import React from 'react';
import { HiChevronDown, HiOutlinePencilAlt } from 'react-icons/hi'
import StaticSidebarList from './static_sidebar_list';
import ChannelsListContainer from './channels_list_container';
import DirectMessageListContainer from './direct_message_list_container';
import WorkspaceMenuContainer from './workspace_menu_container';

class ClientSidebar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      workspaceMenuOpen: false
    }

    this.menuWrapper = React.createRef();
    this.openWorkspaceMenu = this.openWorkspaceMenu.bind(this);
    this.closeWorkspaceMenu = this.closeWorkspaceMenu.bind(this);
  }

  componentDidMount(){
    document.addEventListener("mousedown", this.closeWorkspaceMenu);
  }

  componentWillUnmount(){
    document.removeEventListener("mousedown", this.closeWorkspaceMenu);
  }

  closeWorkspaceMenu(event){
    if(this.menuWrapper && !this.menuWrapper.current.contains(event.target)){
      this.setState({ workspaceMenuOpen: false })
    }
  }

  openWorkspaceMenu(){
    this.setState({ workspaceMenuOpen: true })
  }

  render(){
    const { workspace } = this.props
    if (!workspace){
      return null;
    }

    return(
      <>
          <section className='c-workspace-sidebar'>
            <div className='workspace-menu-container'ref={this.menuWrapper}>
              {this.state.workspaceMenuOpen && <WorkspaceMenuContainer />}
            </div>
            <header className='c-workspace-sidebar-header' onClick={this.openWorkspaceMenu}>
              <button className='c-ws-sidebar-header-detail-btn'>
                <span className='c-ws-sidebar-header-text'>{workspace.name}</span>
                <HiChevronDown />
              </button>
              <button className='c-ws-sidebar-header-new-message-btn'>
                <HiOutlinePencilAlt className='new-message-pencil-icon' />
              </button>
            </header>
            <StaticSidebarList />
            <ChannelsListContainer />    
            <DirectMessageListContainer />
          </section>
      </>
    )
  }
}

export default ClientSidebar;