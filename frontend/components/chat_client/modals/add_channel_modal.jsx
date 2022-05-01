import React from 'react';


class AddChannelModal extends React.Component{
  constructor(props){
    super(props)
  } 
  
  showModal(name){
    const modal = {
      name: name,
      posX: 0,
      posY: 0
    }
    return () =>{
      this.props.showModal(modal)
    }
  }
  
  render() {
    const {modalOpen, posX, posY, } = this.props
    const modalClass = modalOpen ? 'modal' : 'hidden'
    return(
      <div className={modalClass} >
        <div className='sidebar-add-channel-modal-content' style={{left: posX, top: posY }}>
          <div className='sidebar-add-channel-modal-item' onClick={this.showModal('create-channel-modal')}>
            <span>Create a new channel</span>
          </div>
          <div className='sidebar-add-channel-modal-item'>
            <span>Browse all channels</span>
          </div>
        </div>
      </div>
    )
  }
  
}

export default AddChannelModal;
