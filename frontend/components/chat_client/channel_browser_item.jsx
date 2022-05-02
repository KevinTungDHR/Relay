import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'

class ChannelBrowserItem extends React.Component {
  constructor(props){
    super(props);

    this.handleLeave = this.handleLeave.bind(this)
    this.handleJoin = this.handleJoin.bind(this)

  }

  handleLeave(){
    this.props.leaveChannel(this.props.channel.id)
  }

  handleJoin(){
    this.props.joinChannel(this.props.channel.id)
  }
  renderButtons(){
    const { myChannels, channel } = this.props
    if(myChannels[channel.id]){
      return (
        <div className='channel-browser-item-buttons'>
          <button 
            className='btn simple-btn channel-browser-list-button'
            onClick={this.handleLeave}>Leave</button>
        </div>
      )
    } else {
      return (
        <div className='channel-browser-item-buttons'>
          <button className='btn simple-btn channel-browser-list-button'>View</button>
          <button 
          className='btn green-btn channel-browser-list-button'
          onClick={this.handleJoin}>Join</button>
        </div>
      )
    }
  }

  renderAccess(){
    if(this.props.channel.public) {
      return (
        <div className='channel-browser-icon-container'>
          <BsHash />
        </div>
      )
    } else {
     return (
       <div className='channel-browser-icon-container'>
        <CgLock className='channel-browser-lock-icon'/>
       </div>
     )
    }
  }

  renderDescription(){
    const { channel, myChannels } = this.props;
    const descriptions = []
    if(myChannels[channel.id]){
      descriptions.push("Joined")
    }
    if(channel.description !== ""){
      descriptions.push(channel.description)
    }

    return(
      <div>{descriptions.join(" \u00B7 ")}</div>
    )
  }

  render(){
    const { channel } = this.props;
    return(
        <div className='channel-browser-list-item'>
          <div className='channel-browser-list-info'>
            <div >
              <h3 className='channel-browser-item-title'>{this.renderAccess()} {channel.name}</h3>
            </div>
            <div className='channel-browser-item-description'>
              {this.renderDescription()}
            </div>
          </div>
          {this.renderButtons()}
        </div>
    )
  }
}
  

export default ChannelBrowserItem;