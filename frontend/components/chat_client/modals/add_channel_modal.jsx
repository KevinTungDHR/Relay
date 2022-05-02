import React from 'react';

class AddChannelModal extends React.Component{
  constructor(props){
    super(props)

    this.browseChannels = this.browseChannels.bind(this)
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

  browseChannels(e){
    const { workspaceId } = this.props.match.params 
    e.preventDefault()
    this.props.hideModal()
    this.props.history.push(`/client/${workspaceId}/browse-channels`)
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
          <div onClick={this.browseChannels} className='sidebar-add-channel-modal-item'>
            <span>Browse all channels</span>
          </div>
        </div>
      </div>
    )
  }
  
}

export default AddChannelModal;
