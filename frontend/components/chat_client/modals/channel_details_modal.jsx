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
    this.hideNestedModal = this.hideNestedModal.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleLeave(){
    const { channelId } = this.props.modal
    const channel = this.props.channels[channelId]
    this.hideNestedModal()
    this.props.hideModal()
    this.props.leaveChannel(channel.id)

    // This works for making sure that you go to an available channel 
    // if your currently at that channel when you leave. Need to refactor
    if (parseInt(this.props.match.params.channelId) === channelId){
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
      const workspaceId = this.props.match.params.workspaceId
      for (const key in this.props.channels){
        if (parseInt(key) !== channelId){
          const newPath = fullPath.replace(regexp, `/client/${workspaceId}/${key}`);
          this.props.history.push(newPath)
          break;
        }
      }
    }

  }

  editModalOpen(modalName){
    return () => {
      this.setState({editModalOpen: true, modalName: modalName})
    }
  }

  hideNestedModal(){
    this.setState({ editModalOpen: false, modalName: null })
  }

  renderEditModals(){
    if(!this.state.editModalOpen){
      return null
    }

    switch(this.state.modalName){
      case 'edit-description':
        return <EditChannelDescriptionContainer hideModal={this.hideNestedModal} />
      case 'edit-channel-name':
        return <EditChannelNameContainer hideModal={this.hideNestedModal} />
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