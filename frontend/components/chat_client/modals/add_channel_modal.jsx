import React from 'react';
import { NavLink } from 'react-router-dom';

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
    const { workspaceId } = this.props.match.params 
    const {modalOpen, posX, posY, } = this.props
    const modalClass = modalOpen ? 'modal' : 'hidden'
    return(
      <div className={modalClass} >
        <div className='sidebar-add-channel-modal-content' style={{left: posX, top: posY }}>
          <div className='sidebar-add-channel-modal-item' onClick={this.showModal('create-channel-modal')}>
            <span>Create a new channel</span>
          </div>
          <NavLink to={`/client/${workspaceId}/browse-channels`} className='sidebar-add-channel-modal-item'>
            <span>Browse all channels</span>
          </NavLink>
        </div>
      </div>
    )
  }
  
}

export default AddChannelModal;
