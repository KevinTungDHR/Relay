import React from 'react';
import { GrClose } from 'react-icons/gr';
import { CgLock } from 'react-icons/cg';
import { BsHash } from 'react-icons/bs';
import EditChannelDescriptionContainer from './edit_channel_description_container';
import EditChannelNameContainer from './edit_channel_name_container';

class ChannelDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = { editModalOpen: false, modalName: null }
    this.hideModal = this.hideModal.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleLeave(){
    const { channelId } = this.props.modal
    const channel = this.props.channels[parseInt(channelId)]
    this.props.leaveChannel(channel.id)

    if (this.props.match.params.channelId === channelId){
      debugger
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
     
      for (const key in this.props.channels){
        if (parseInt(key) !== channelId){
          const newPath = fullPath.replace(regexp, `/client/${channel.workspaceId}/${key}`);
          this.props.history.push(newPath)
        }
      }
    }

  }

  editModalOpen(modalName){
    return () => {
      this.setState({editModalOpen: true, modalName: modalName})
    }
  }

  hideModal(){
    this.setState({ editModalOpen: false, modalName: null })
  }

  renderEditModals(){
    if(!this.state.editModalOpen){
      return null
    }

    switch(this.state.modalName){
      case 'edit-description':
        return <EditChannelDescriptionContainer hideModal={this.hideModal} />
      case 'edit-channel-name':
        return <EditChannelNameContainer hideModal={this.hideModal} />
      default:
        return null;
    }
  }

  render(){
    const { hideModal, users } = this.props
    const { channelId } = this.props.modal
    const channel = this.props.channels[parseInt(channelId)]
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
              <div 
                onClick={this.editModalOpen("edit-channel-name")}
                className='channel-details-body-item channel-details-description'>
                <div>
                  <h3>Channel name</h3>
                  <div>{channel.name}</div>
                </div>
                <div>
                  <button className='btn channel-details-body-edit'>Edit</button>
                </div>
              </div>
            </div>
          </div>

          <div className='channel-details-modal-body-container'>
            <div className='channel-details-modal-body'>
              <div  
                onClick={this.editModalOpen("edit-description")}
                className='channel-details-body-item channel-details-description'>
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
                <button 
                  onClick={this.handleLeave}
                  className='btn channel-details-leave-channel '>
                  <h3>Leave Channel</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.renderEditModals()}
      </div>
    )
  }
}

export default ChannelDetails;