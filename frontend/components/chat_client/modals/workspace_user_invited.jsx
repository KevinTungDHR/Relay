import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

class WorkspaceUserInvited extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='modal dark-modal'>
        <div className='workspace-users-invited-content'>
          <div className='workspace-users-invited-icon'>
            <IoMdCheckmark className='workspace-users-invited-checkmark'/>
            <div>Sent</div>
            <div>Users will see their invites when they log in to Relay!</div>
          </div>
          <div className='btn green-btn workspace-invite-button' onClick={this.props.hideModal}>Done</div>
        </div>
      </div>
    )
  }
}

export default WorkspaceUserInvited;