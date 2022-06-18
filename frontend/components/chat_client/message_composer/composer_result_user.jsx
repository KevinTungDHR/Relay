import React from 'react';
import { IoMdCheckmark } from 'react-icons/io'
class ComposerResultUser extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { user, addUser, checked } = this.props;
    return(
      <div className={checked ? 'message-composer-channel-item composer-item-checked' : 'message-composer-channel-item'} onClick={addUser} >
        {checked ? <IoMdCheckmark className='message-composer-item-checkmark'/> : <div></div>}
        <div>{user.displayName}</div>
      </div>
    )
  }
}

export default ComposerResultUser;