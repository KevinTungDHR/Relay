import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import ChannelMessageItemContainer from './channel_message_item_container';

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    const { channelId } = this.props.match.params
    this.props.fetchChannel(channelId)
  }

  componentDidUpdate(prevProps){
    const { channelId } = this.props.match.params
    if(prevProps.match.params.channelId !== channelId){
      this.props.fetchChannel(channelId)
    }
  }

  render(){
    const { messages, channel, isLoading } = this.props

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
        </header>
        <div className='client-channel-messages-container'>
          {messages.map((message, idx) => <ChannelMessageItemContainer key={idx} message={message}/>)}
        </div>
        <div className='text-editor-container'>
          Text Editor
        </div>
      </div>
    )
  }
}

export default ChannelPrimaryView;