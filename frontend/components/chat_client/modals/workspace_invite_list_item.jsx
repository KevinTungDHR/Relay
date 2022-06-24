import React from 'react';
import { GrClose } from 'react-icons/gr';

class WorkspaceInviteListItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='message-composer-card-item'>
        <div className='message-composer-card-name '>{this.props.email}</div>
        <GrClose className='message-composer-card-close-button' onClick={this.props.removeUser}/>
      </div>
    )
  }
}

export default WorkspaceInviteListItem;