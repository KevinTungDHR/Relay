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
          <FaUser className="channel-msg-profile-icon"/>
        </div>
        <div className='channel-msg-content'>
          <div className='channel-msg-author'>
            {users[message.authorId].displayName}
          </div>
          <section className='channel-msg-body'>
            {message.body}
          </section>
        </div>
      </div>
    )
  }
}

export default ChannelMessageItem;