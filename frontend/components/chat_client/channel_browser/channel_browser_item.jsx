import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { GrClose } from 'react-icons/gr';

class ChannelBrowserItem extends React.Component {
  constructor(props){
    super(props);

    this.state = { leavePrivateChannelModalOpen: false };
    this.handleLeave = this.handleLeave.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.viewChannel = this.viewChannel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.confirmLeave = this.confirmLeave.bind(this);
    this.clickOffModal = this.clickOffModal.bind(this);
  }

  clickOffModal(e){
    e.preventDefault()
    if(e.target.classList.contains('modal')){
      this.setState({ leavePrivateChannelModalOpen: false })
    }
  }

  handleClick(e){
    e.stopPropagation()
    if (this.props.myChannels[this.props.channel.id] == null){
      this.props.joinChannel(this.props.channel.id)
    }
    this.viewChannel()
  }

  handleLeave(e){
    e.stopPropagation()
    if(this.props.channel.required){
      const modal = {
        name: 'membership-alert-modal',
        channelName: this.props.channel.name
      }
      this.props.showModal(modal)
      return;
    }

    if(!this.props.channel.public){
      this.setState({ leavePrivateChannelModalOpen: true })
    } else {
      this.props.leaveChannel(this.props.channel.id)
    }
  }

  confirmLeave(e){
    e.stopPropagation()

    this.props.leaveChannel(this.props.channel.id)
  }

  handleJoin(e){
    e.stopPropagation()
    this.props.joinChannel(this.props.channel.id)
  }

  viewChannel(){
    const { fullPath, url, channel } = this.props
    const regexp = new RegExp(url)

    const newPath = fullPath.replace(regexp, `/client/${channel.workspaceId}/C${channel.id}`);
    this.props.history.push(newPath)
  }

  renderLeavePrivate(){
    const { channel } = this.props

    if(this.state.leavePrivateChannelModalOpen){
      return(
          <div className='modal dark-modal' onClick={this.clickOffModal}>
            <div className='leave-private-channel-modal'>
            <div className='leave-private-channel-header'>
              <div className='leave-private-channel-title'>Leave 
              <div className='leave-private-channel-icon-container'>
                <CgLock className='leave-private-channel-lock-icon'/>
              </div>{channel.name}</div>
              <GrClose className='leave-private-channel-close' onClick={() => this.setState({ leavePrivateChannelModalOpen: false })}/>
            </div>
            <div className='leave-private-channel-content'>
              When you leave a private channel, you'll no longer be able to see any of its messages. To rejoin this channel later, you'll need to be invited.
            </div>
            <div className='leave-private-channel-button-container'>
              <button className='leave-private-channel-button-cancel btn simple-btn' onClick={() => this.setState({ leavePrivateChannelModalOpen: false })}>Cancel</button>
              <button className='leave-private-channel-button-leave' onClick={this.confirmLeave}>Leave Channel</button>
            </div>
          </div>
          </div>
      )
    }
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
          className='btn green-btn channel-browser-list-button btn'
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
      <>
        <div onClick={this.handleClick} className='channel-browser-list-item'>
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
        {this.renderLeavePrivate()}
      </>
    )
  }
}
  

export default ChannelBrowserItem;