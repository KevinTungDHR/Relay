import React from 'react';

class ChannelOptionsModal extends React.Component{
  constructor(props){
    super(props)
  } 
  
  // Need this for channel details
  showModal(name){
    return () =>{
      const modal = {
        name: name,
        posX: 0,
        posY: 0,
        channel: this.props.channel
      }
      this.props.showModal(modal)
    }
  }
  
  render() {
    const { posX, posY, } = this.props
    return(
      <div className="modal" >
        <div className='sidebar-modal-content' style={{left: posX, top: posY }}>
          <div className='channel-options-item'>Open in split view</div>
          <div >
            <div className='channel-options-item'>Change notifications</div>
            <div className='channel-options-item'>Mute channel</div>
          </div>
          <div className='channel-options-item-container'>
            <div className='channel-options-item'>Copy name</div>
            <div className='channel-options-item'>Copy link</div>
          </div>
          <div className='channel-options-item'>Star channel</div>
          <div className='channel-options-item-container'>
            <div className='channel-options-item' onClick={this.showModal('channel-details-modal')}>Open channel details</div>
            <div className='channel-options-item'>Leave channel</div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default ChannelOptionsModal;