import React from 'react';
import { FaUser } from 'react-icons/fa';

class AllDMListItem extends React.Component {
  constructor(props){
    super(props)

    this.renderName = this.renderName.bind(this);
    this.goToMessage = this.goToMessage.bind(this);
  }

  goToMessage(){
    const { fullPath, url, directMessage } = this.props
    const regexp = new RegExp(url)

    const newPath = fullPath.replace(regexp, `/client/${directMessage.workspaceId}/D${directMessage.id}`);
    this.props.history.push(newPath)
  }

  renderName(){
    const { directMessage, subscriptions, sessionId, users } = this.props
    const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)
    if (otherUsers.length === 1){
      return  <span className='all-dm-list-item-text'>{otherUsers[0].displayName}</span>
    } else if (otherUsers.length == 2) {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      return  <span className='all-dm-list-item-text '>{names}</span>
    } else {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      const ending = otherUsers.length == 3 ? ` and ${otherUsers.length - 2} other` : ` and ${otherUsers.length - 2} others` 
      return  <span className='all-dm-list-item-text'>{names + ending}</span>
    }
  }

  render(){
    const { directMessage } = this.props
    const { messageIds, subscriptionIds } = directMessage;
    const lastMessageId = messageIds[messageIds.length - 1];
    const message = this.props.messages[lastMessageId]
    let date = new Date(message.createdAt);
    const options =  { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

    return (
      <div className='all-dm-list-item-container' onClick={this.goToMessage}>
        <div className='all-dm-list-item-icon'>
          <FaUser />
        </div>
        <div className='all-dm-list-item-content'>
          <div className='all-dm-list-item-header'>
            <div className='all-dm-list-item-name'>{this.renderName()}</div>
            <div className='all-dm-list-item-time'>{date.toLocaleDateString('en-us', options)}</div>
          </div>
          <div>{message.body}</div>
        </div>
      </div>
    )
  }

}

export default AllDMListItem;