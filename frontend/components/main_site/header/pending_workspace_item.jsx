import React from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
class PendingWorkspaceItem extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    const { workspace } = this.props
    return(
      <div className='workspace-invite-list-item'>
        <div>{workspace.name}</div>
        <div className='ws-invite-list-item-button-container'>
          <IoMdCheckmark onClick={() => this.props.acceptWorkspaceInvite(workspace.id)} className="ws-invite-button ws-invite-button-check" />
          <IoMdClose onClick={() => this.props.declineWorkspaceInvite(workspace.id)} className="ws-invite-button ws-invite-button-close" />
        </div>
      </div>
    )
  }
}

export default PendingWorkspaceItem;