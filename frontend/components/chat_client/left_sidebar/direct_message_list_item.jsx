import React from 'react';
import { FaUser } from "react-icons/fa"
import { RiCloseFill } from 'react-icons/ri';
import consumer from '../../../consumer';

class DirectMessageListItem extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this);
    this.openOptionsModal = this.openOptionsModal.bind(this);
    this.closeConversation = this.closeConversation.bind(this);
  }

  enterChannel(){
    this.subscription = consumer.subscriptions.create(
      { channel: 'WorkspaceChannel', id: `${this.props.directMessage.id}`, type: 'DirectMessage' },
      {
        received: ({message, user}) => {
         this.props.receiveUser(user);
         this.props.receiveMessage(message);
        }
      }
    );
  }

  openOptionsModal(name){
    return (e) => {

      e.preventDefault();
      const modal = {
        name: name,
        posX: e.clientX,
        posY: e.clientY,
        directMessageId: this.props.directMessage.id
      }

      this.props.showModal(modal);
    }
  }

  handleClick(){
    const { fullPath, url, directMessage } = this.props
    const regexp = new RegExp(url)

    const newPath = fullPath.replace(regexp, `/client/${directMessage.workspaceId}/D${directMessage.id}`);
    // Avoid double push error
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath)
    }
  }

  componentDidMount(){
    this.enterChannel()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  closeConversation(e){
    e.stopPropagation();
    this.props.closeDirectMessage(this.props.directMessage.id);

    if (parseInt(this.props.directMessageId) === this.props.directMessage.id){
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
      const workspaceId = this.props.match.params.workspaceId
      for (const key in this.props.channels){
        const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
        this.props.history.push(newPath)
        break;
      }
    }
  }

  renderName(){
    const { directMessage, subscriptions, sessionId, users } = this.props
    // if (directMessage.workspaceId !== parseInt(this.props.match.params.workspaceId)){
    //   return null;
    // }
    const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)

    if (otherUsers.length === 0) {
      return  <h2 className='direct-message-list-item-text'>{users[sessionId].displayName} <span>you</span></h2>
    } else if (otherUsers.length === 1){
      return  <span className='direct-message-list-item-text'>{otherUsers[0].displayName}</span>
    } else if (otherUsers.length == 2) {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      return  <span className='direct-message-list-item-text '>{names}</span>
    } else {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      const ending = otherUsers.length == 3 ? ` and ${otherUsers.length - 2} other` : ` and ${otherUsers.length - 2} others` 
      return  <span className='direct-message-list-item-text'>{names + ending}</span>
    }
  }

  render(){
    const { directMessage, directMessageId } = this.props
    if (!directMessage){
      return null;
    }
    const activeDM = directMessageId == directMessage.id ? "active-channel" : ""
    const isHidden = this.props.isHidden && !activeDM ? "hidden" : ""
    return(
      <div 
      className={`direct-message-list-item  ${activeDM} ${isHidden}`}  
      onClick={this.handleClick} 
      onContextMenu={this.openOptionsModal('directMessages-options-modal')}>
        <div className='direct-message-item-content'>
          <div className='channel-list-item-icon-container'>
            <FaUser />
          </div>
          {this.renderName()}
        </div>
        <div className='direct-message-list-close-button' onClick={this.closeConversation}>
          <RiCloseFill className='direct-message-list-close-icon'/>
        </div>
      </div>
    )
  }
  
}

export default DirectMessageListItem;