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
    e.preventDefault()
    this.props.hideModal()

    const { fullPath, url } = this.props
    const { workspaceId } = this.props.match.params 

    const regexp = new RegExp(url)
    const newPath = fullPath.replace(regexp, `/client/${workspaceId}/browse-channels`);
    this.props.history.push(newPath)
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
