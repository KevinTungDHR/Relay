import React from 'react';

class ChannelOptionsModal extends React.Component{
  constructor(props){
    super(props)
  } 
  
  // Need this for channel details
  showModal(name){
    return (e) =>{
      const modal = {
        name: name,
        posX: 0,
        posY: 0
      }
      this.props.showModal(modal)
    }
  }
  
  render() {
    const {modalOpen, posX, posY, } = this.props
    const modalClass = modalOpen ? 'modal' : 'hidden'
    return(
      <div className={modalClass} >
        <div className='sidebar-modal-content' style={{left: posX, top: posY }}>
          <div className='sidebar-modal-item'>Open in split view</div>
          <div className='sidebar-modal-item'>
            <div>Change notifications</div>
            <div>Mute channel</div>
          </div>
          <div className='sidebar-modal-item'>
            <div>Copy name</div>
            <div>Copy link</div>
          </div>
          <div className='sidebar-modal-item'>Star channel</div>
          <div className='sidebar-modal-item'>
            <div>Open channel details</div>
            <div>Leave channel</div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default ChannelOptionsModal;