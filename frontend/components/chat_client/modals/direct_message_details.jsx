import React from 'react';
import { GrClose } from 'react-icons/gr';
import ChannelDetailsUserItemContainer from './channel_details_user_item_container';
import AddDmMemberModalContainer from './add_dm_member_modal_container';
import { AiOutlineUserAdd } from 'react-icons/ai';
class DirectMessageDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = { addPeopleModalOpen: false }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    this.props.fetchDirectMessage(this.props.modal.directMessageId)
  }

  openModal(){
    this.setState({ addPeopleModalOpen: true })
  }

  closeModal(){
    this.setState({ addPeopleModalOpen: false })
  }

  clickOffModal(){
    
  }

  // handleLeave(){
  //   const { channelId } = this.props.modal
  //   const channel = this.props.channels[channelId]
  //   this.props.leaveChannel(channel.id)

  //   // This works for making sure that you go to an available channel 
  //   // if your currently at that channel when you leave. Need to refactor
  //   if (parseInt(this.props.channelId) === channelId){
  //     const { fullPath, url } = this.props
  //     const regexp = new RegExp(url)
  //     const workspaceId = this.props.match.params.workspaceId
  //     for (const key in this.props.channels){
  //       if (parseInt(key) !== channelId){
  //         const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
  //         this.props.history.push(newPath)
  //         break;
  //       }
  //     }
  //   }
  // }

  renderName(){
    const { directMessageId } = this.props.modal
    const directMessage = this.props.directMessages[parseInt(directMessageId)]
    const { subscriptions, sessionId, users } = this.props

    const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)
    if (otherUsers.length === 1){
      return  <span className='channel-list-item-text no-wrap-ellipsis'>{otherUsers[0].displayName}</span>
    } else if (otherUsers.length == 2) {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      return  <span className='channel-list-item-text no-wrap-ellipsis'>{names}</span>
    } else {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      const ending = otherUsers.length == 3 ? ` and ${otherUsers.length - 2} other` : ` and ${otherUsers.length - 2} others` 
      return  <span className='channel-list-item-text no-wrap-ellipsis'>{names + ending}</span>
    }
  }

  render(){
    const { hideModal, users, subscriptionsArr } = this.props
    const { directMessageId } = this.props.modal
    const directMessage = this.props.directMessages[parseInt(directMessageId)]
    const directMessageSubs = subscriptionsArr.filter(sub => sub.subscribeableId === directMessage.id && sub.subscribeableType === "DirectMessage")
    return(
      <div className={`dark-modal modal`}>
        {this.state.addPeopleModalOpen && <AddDmMemberModalContainer closeModal={this.closeModal} />}
        <div className='channel-details-modal-content'>
          <header className='channel-details-modal-header'>
            <div className="channel-details-modal-title">
              <div className="channel-details-modal-name">
                <h2>{this.renderName()}</h2>
              </div>
              <div
                onClick={hideModal} 
                className='channel-details-close-container'>
                <GrClose className='channel-details-close-icon'/>
              </div>
            </div>

            <div className='channel-details-tabs'>
              <div className="tab active-tab">Members</div>
            </div>
          </header>
          <div className='channel-details-members-list'>
          <div className='channel-details-user-item-container' onClick={this.openModal}>
            <div className='details-member-profile-icon-add-container'>
              <AiOutlineUserAdd className='details-member-profile-icon-add'/>
            </div>
            <div className='details-member-user-item-displayname'>
              <div>Add people</div>
            </div>
          </div>
            {directMessageSubs.map((sub, idx) => <ChannelDetailsUserItemContainer key={idx} user={users[sub.userId]} userInChannel={true} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default DirectMessageDetails;