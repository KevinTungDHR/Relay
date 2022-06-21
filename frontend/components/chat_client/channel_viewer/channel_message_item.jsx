import React from 'react';
import { FaUser } from "react-icons/fa"

class ChannelMessageItem extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){
    const { message, users } = this.props

    const user = users[message.authorId]
    const { pathname } = this.props.location

    const cleanPath = pathname.split("/").slice(0,4).join("/")
    const newPath = `${cleanPath}/user_profile/${user.id}`
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath)
    }
  }

  render(){
    const { message, users } = this.props
   
    return(
      <div className='channel-msg-item-container'>
        <div className="channel-msg-item-profile">
          <FaUser className="channel-msg-profile-icon"/>
        </div>
        <div className='channel-msg-content'>
          <div className='channel-msg-author' >
            <span onClick={this.handleClick}>{users[message.authorId].displayName}</span>
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