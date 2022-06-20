import React from 'react';

class DirectMessagesOptionsModal extends React.Component{
  constructor(props){
    super(props)

    // this.closeChannel = this.closeChannel.bind(this);
  } 

  // leaveChannel(){
  //   const { channelId } = this.props.modal
  //   const channel = this.props.channels[channelId]
  //   if(channel.required){
  //     const modal = {
  //       name: 'membership-alert-modal',
  //       channelName: channel.name
  //     }
  //     this.props.showModal(modal)
  //     return;
  //   }
  //   this.props.leaveChannel(channelId);
  //   this.props.hideModal();

  //   if (parseInt(this.props.channelId) === channelId){
  //     const { fullPath, url } = this.props
  //     const regexp = new RegExp(url)
  //     const workspaceId = this.props.match.params.workspaceId
  //     for (const key in this.props.channels){
  //       if (parseInt(key) !== channelId){
  //         const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
  //         this.props.history.push(newPath)
  //         break;
  //       }
  //     }
  //   }
  // }
  
  // Need this for channel details
  showModal(name){
    return () =>{
      const modal = {
        name: name,
        posX: 0,
        posY: 0,
        directMessageId: this.props.directMessageId,
        tab: 2
      }
      this.props.showModal(modal)
    }
  }
  
  render() {
    const { posX, posY, } = this.props
    return(
      <div className="modal" >
        <div className='sidebar-modal-content-wide' style={{left: posX, top: posY }}>
          {/* <div className='channel-options-item'>Open in split view</div>
          <div >
            <div className='channel-options-item'>Change notifications</div>
            <div className='channel-options-item'>Mute channel</div>
          </div>
          <div className='channel-options-item-container'>
            <div className='channel-options-item'>Copy name</div>
            <div className='channel-options-item'>Copy link</div>
          </div>
          <div className='channel-options-item'>Star channel</div> */}
          <div className='channel-options-item-container'>
            <div className='channel-options-item' onClick={this.showModal('direct-messages-details-modal')}>View conversation details</div>
            <div className='channel-options-item' >Close conversation</div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default DirectMessagesOptionsModal;