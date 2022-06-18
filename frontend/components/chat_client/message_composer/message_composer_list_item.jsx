import React from 'react';
import { FaUser } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

class MessageComposerListItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='message-composer-card-item'>
        <div className='message-composer-profile-icon-container'>
          <FaUser className='message-composer-profile-icon'/>
        </div>
        <div className='message-composer-card-name '>{this.props.user.displayName}</div>
        <GrClose className='message-composer-card-close-button' onClick={this.props.removeUser}/>
      </div>
    )
  }
}

export default MessageComposerListItem;