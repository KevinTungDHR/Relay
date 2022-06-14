import React from 'react';
import { FaUser } from 'react-icons/fa';

const AddPeopleSearchItem = ({user, addMember}) => {
  return (
    <div className='invite-member-list-item' onClick={() => addMember(user)}>
      <div className='invite-member-profile-icon-container'>
        <FaUser className='invite-member-profile-icon'/>
      </div>
      <div className='invite-member-name'>{user.displayName}</div>
    </div>
  )
}

export default AddPeopleSearchItem;