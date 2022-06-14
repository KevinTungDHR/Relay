import React from 'react';
import { FaUser } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

class UserCardItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='user-card-item'>
        <div className='user-card-profile-icon-container'>
          <FaUser className='user-card-profile-icon'/>
        </div>
        <div className='user-card-name'>{this.props.user.displayName}</div>
        <GrClose className='user-card-close-button' onClick={this.props.removeMember}/>
      </div>
    )
  }
}

export default UserCardItem;