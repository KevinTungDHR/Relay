import React from 'react';
import { FaUser } from "react-icons/fa"

class ChannelMessageItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { message, users } = this.props
   
    return(
      <div className='channel-msg-item-container'>
        <div className="channel-msg-item-profile">
          <FaUser />
        </div>
        <div className='channel-msg-content'>
          <div className='channel-msg-author'>
            {users[message.authorId].displayName}
          </div>
          <p className='channel-msg-body'>
            {message.body}
          </p>
        </div>
      </div>
    )
  }
}

export default ChannelMessageItem;