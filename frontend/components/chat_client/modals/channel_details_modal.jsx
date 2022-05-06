import React from 'react';
import { GrClose } from 'react-icons/gr';
import { CgLock } from 'react-icons/cg';
import { BsHash } from 'react-icons/bs';
import EditChannelDescriptionContainer from './edit_channel_description_container';
import EditChannelNameContainer from './edit_channel_name_container';
import ChannelDetailsUserItemContainer from './channel_details_user_item_container';

class ChannelDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = { editModalOpen: false, modalName: null, tab: this.props.modal.tab }
    this.hideNestedModal = this.hideNestedModal.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  componentDidMount(){
    this.props.fetchChannel(this.props.modal.channelId)
  }

  handleLeave(){
    const { channelId } = this.props.modal
    const channel = this.props.channels[channelId]
    this.hideNestedModal()
    this.props.hideModal()
    this.props.leaveChannel(channel.id)

    // This works for making sure that you go to an available channel 
    // if your currently at that channel when you leave. Need to refactor
    if (parseInt(this.props.channelId) === channelId){
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
      const workspaceId = this.props.match.params.workspaceId
      for (const key in this.props.channels){
        if (parseInt(key) !== channelId){
          const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
          this.props.history.push(newPath)
          break;
        }
      }
    }
  }

  handleDelete(){
    const { channelId } = this.props.modal
    const channel = this.props.channels[channelId]
    this.hideNestedModal()
    this.props.hideModal()
    this.props.deleteChannel(channel.id)

    // This works for making sure that you go to an available channel 
    // if your currently at that channel when you leave. Need to refactor
    if (parseInt(this.props.channelId) === channelId){
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
      const workspaceId = this.props.match.params.workspaceId
      for (const key in this.props.channels){
        if (parseInt(key) !== channelId){
          const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
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

  changeTab(tabNum){
    return () => {
      this.setState({
        tab: tabNum
      })
    }
  }

  render(){
    const { hideModal, users, subscriptions } = this.props
    const { tab } = this.state
    const { channelId } = this.props.modal
    const channel = this.props.channels[parseInt(channelId)]
    const channelSubs = subscriptions.filter(sub => sub.subscribeableId === channel.id && sub.subscribeableType === "Channel")
    return(
      <div className={`dark-modal modal`}>
        <div className='channel-details-modal-content'>
          <header className='channel-details-modal-header'>
            <div className="channel-details-modal-title">
              <div className="channel-details-modal-name">
                {channel.public ? <BsHash /> : <CgLock />}
                <h2>{channel.name}</h2>
              </div>
              <div
                onClick={hideModal} 
                className='channel-details-close-container'>
                <GrClose className='channel-details-close-icon'/>
              </div>
            </div>

            <div className='channel-details-tabs'>
              <div onClick={this.changeTab(1)} className={`tab ${tab === 1 ? "active-tab" : "" }`}>About</div>
              <div onClick={this.changeTab(2)} className={`tab ${tab === 2 ? "active-tab" : "" }`}>Members</div>
            </div>
          </header>
          {this.state.tab === 1 &&
          <>
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
                  <div onClick={this.handleLeave} className='channel-details-body-item'>
                    <button 
                      className='btn channel-details-leave-channel '>
                      <h3>Leave Channel</h3>
                    </button>
                  </div>
                  <div onClick={this.handleDelete} className='channel-details-body-item'>
                    <button 
                      className='btn channel-details-leave-channel '>
                      <h3>DELETE Channel</h3>
                    </button>
                  </div>
                </div>
              </div>  
            </>
          }
          {this.state.tab === 2 &&
            <div className='channel-details-members-container'>
              {channelSubs.map((sub, idx) => <ChannelDetailsUserItemContainer key={idx} user={users[sub.userId]} />)}
            </div>
          }
        </div>
        {this.renderEditModals()}
      </div>
    )
  }
}

export default ChannelDetails;