import React from 'react';
import PendingWorkspaceItemContainer from './pending_workspace_item_container';

class NotificationsMenu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { pendingWorkspaces } = this.props
    return(
      <div className='workspace-invite-notification-menu'>
        {pendingWorkspaces.length > 0 && <div className='workspace-invite-notification-menu-header'>Pending Invites</div>}
        {pendingWorkspaces.length === 0 && <div>No Pending Invites</div>}
        {pendingWorkspaces.map((ws, idx) => <PendingWorkspaceItemContainer key={idx} workspace={ws}/>)}
      </div>
    )
  }
}

export default NotificationsMenu;