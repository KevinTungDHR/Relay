import React from 'react';
import { GrClose } from 'react-icons/gr';
import { CgLock } from 'react-icons/cg';
import { BsHash } from 'react-icons/bs';

class ChannelDetails extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { hideModal, users } = this.props
    const { channel } = this.props.modal
    return(
      <div className={`dark-modal modal`}>
        <div className='channel-details-modal-content'>
          <header className="channel-details-modal-header">
            <div className="channel-details-modal-name">
              {channel.public ? <BsHash /> : <CgLock />}
              <h2>{channel.name}</h2>
            </div>
            <div
              onClick={hideModal} 
              className='channel-details-close-container'>
              <GrClose className='channel-details-close-icon'/>
            </div>
          </header>
          <div className='channel-details-modal-body-container'>
            <div className='channel-details-modal-body'>
              <div className='channel-details-body-item channel-details-description'>
                <div>
                  <h3>Description</h3>
                  <div>{channel.description}</div>
                </div>
               <div>
                  <button className='btn channel-details-body-edit'>Edit</button>
                </div>
              </div>
              <div className='channel-details-body-item'>
               <div>
                <h3>Created By</h3>
                <div>{users[channel.adminId].displayName}</div>
               </div>
              </div>
              <div className='channel-details-body-item'>
                <button className='btn channel-details-leave-channel '>
                  <h3>Leave Channel</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelDetails;