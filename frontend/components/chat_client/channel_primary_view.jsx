import React, { createRef } from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { FaUser } from "react-icons/fa"
import ChannelMessageItemContainer from './channel_message_item_container';

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)

    this.chatEndRef = React.createRef()
  }


  componentDidMount(){
    const { channelId } = this.props.match.params
    this.props.fetchChannel(channelId)
      .then(() => this.scrollChat())
  }

  componentDidUpdate(prevProps){
    const { channelId } = this.props.match.params
    if(prevProps.match.params.channelId !== channelId){
      this.props.fetchChannel(channelId)
        .then(() => this.scrollChat())
    }
  }

  scrollChat(){
    this.chatEndRef.current.scrollIntoView()
    //{ behavior: "smooth" } took out because it's weird on the first load
  }

  render(){
    const { messages, channel, isLoading, users } = this.props

    if(isLoading){
      return null;
    }
    return(
      <div className='channel-messages-container'>
        <header className='channel-messages-header'>
          <div className='channel-messages-header-title'>
            {channel.public ? 
              <BsHash className='channel-messages-header-hash-icon'/> : 
              <CgLock className='channel-messages-header-lock-icon'/>}
            <h2>{channel.name}</h2>
          </div>
          <button className='btn channel-messages-members-button-container'>
            <FaUser className='channel-messages-members-icon'/>

            {/* {users.slice(0, 2).map((user,idx) => {
            return (
            <div key={idx} className='channel-messages-members-icon-container'>
              <FaUser className='channel-messages-members-icon'/>
            </div>
            )})} */}
            <span>{users.length}</span>
          </button>
        </header>
        <div className='client-channel-messages-container'>
          {messages.map((message, idx) => <ChannelMessageItemContainer key={idx} message={message}/>)}
          <div ref={this.chatEndRef} ></div>
        </div>
        <div className='text-editor-container'>
          <input type="text" />
        </div>
      </div>
    )
  }
}

export default ChannelPrimaryView;