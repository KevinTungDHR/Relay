import React from 'react';
import { FaUser } from "react-icons/fa"
import consumer from '../../../consumer';

class DirectMessageListItem extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.openOptionsModal = this.openOptionsModal.bind(this)
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

  renderName(){
    const { directMessage, subscriptions, sessionId, users } = this.props
    const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)
    if (otherUsers.length === 1){
      return  <span className='channel-list-item-text no-wrap-ellipsis'>{otherUsers.first.displayName}</span>
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
    const { directMessage, directMessageId } = this.props
    if (!directMessage){
      return null;
    }
    const activeDM = directMessageId == directMessage.id ? "active-channel" : ""
    const isHidden = this.props.isHidden && !activeDM ? "hidden" : ""
    return(
      <div 
      className={`channel-list-item ${activeDM} ${isHidden}`}  
      onClick={this.handleClick} 
      onContextMenu={this.openOptionsModal('channel-options-modal')}>
        <div className='channel-list-item-icon-container'>
          <FaUser />
        </div>
        {this.renderName()}
      </div>
    )
  }
  
}

export default DirectMessageListItem;