import React from 'react';


export const SidebarAddChannelModal = ({modalOpen, posX, posY}) => {
  const modalClass = modalOpen ? 'modal' : 'hidden'
  return(
    <div className={modalClass} >
      <div className='sidebar-add-channel-modal-content' style={{left: posX, top: posY }}>
        <div className='sidebar-add-channel-modal-item'>
          <span>Create a new channel</span>
        </div>
        <div className='sidebar-add-channel-modal-item'>
          <span>Browse all channels</span>
        </div>
      </div>
    </div>
  )
}
