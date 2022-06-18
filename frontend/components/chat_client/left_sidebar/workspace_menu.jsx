import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md'
class WorkspaceMenu extends React.Component {
  constructor(props){
    super(props);

    this.state = { subMenuOpen: false }
    this.createWorkspace = this.createWorkspace.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.renderWorkspaceMiniIcon = this.renderWorkspaceMiniIcon.bind(this);
  }

  createWorkspace(){
    this.props.createWorkspace()
    .then((action) => this.props.history.push(`/client/${action.workspace.id}/setup`))
  }

  showModal(name){
    const modal = {
      name: name,
      posX: 0,
      posY: 0
    }
    return () =>{
      this.props.showModal(modal)
    }
  }

  renderWorkspaceIcon(){
    const { workspaceId, workspaces } = this.props;
    const currentWorkspace = workspaces[workspaceId];
    const workspaceNameArray = currentWorkspace.name.split(" ");
    return(
      <div className='workspace-menu-icon'>
          {workspaceNameArray.length > 1 ? workspaceNameArray.slice(0,2).map(word => word[0].toUpperCase()): workspaceNameArray[0][0].toUpperCase()}
      </div>
    )
  }

  renderWorkspaceMiniIcon(workspaceName){
    const workspaceNameArray = workspaceName.split(" ");
    return(
      <div className='workspace-menu-mini-icon'>
          {workspaceNameArray.length > 1 ? workspaceNameArray.slice(0,2).map(word => word[0].toUpperCase()): workspaceNameArray[0][0].toUpperCase()}
      </div>
    )
  }

  onMouseEnter(){
    this.setState({ subMenuOpen: true })
  }

  onMouseLeave(){
    this.setState({ subMenuOpen: false })
  }

  render(){
    const { workspaceId, workspaces } = this.props;
    const currentWorkspace = workspaces[workspaceId];
    return (
      <div className='workspace-menu'>
        <header className='workspace-menu-header'>
          {this.renderWorkspaceIcon()}
          <div className='workspace-menu-header-name'>{currentWorkspace.name}</div>
        </header>
        <ul className='workspace-menu-list'>
          <NavLink to='/'>Return to home page</NavLink>
          <li onClick={this.createWorkspace}>Create a new Workspace</li>
          <li onClick={this.showModal('create-channel-modal')}>Create a channel</li>
          <li className='workspace-menu-switchworkplaces' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <div>Switch Workspaces</div>
            <MdKeyboardArrowRight />
            {this.state.subMenuOpen &&  
              <div className='workspace-menu-workplaces-dropdown'>
                {Object.values(workspaces).map((workspace, idx) => {
                  if(workspace.id !== workspaceId){
                    return <NavLink onClick={this.props.closeMenu} to={`/client/${workspace.id}`} className='workspace-dropdown-item' key={idx}>
                      {this.renderWorkspaceMiniIcon(workspace.name)}
                      <div>{workspace.name}</div>
                      </NavLink> 
                  }
                })}
              </div>} 
          </li>      
          <li onClick={this.props.logout}>Log out</li> 
        </ul>
      </div>
    )
  }
}

export default WorkspaceMenu;