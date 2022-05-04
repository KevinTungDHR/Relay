import React from 'react';


const AddPeopleSearchItem = ({user, addMember}) => {
  return (
    <div className='invite-member-list-item' onClick={() => addMember(user)}>
      {user.displayName}
    </div>
  )
}

export default AddPeopleSearchItem;