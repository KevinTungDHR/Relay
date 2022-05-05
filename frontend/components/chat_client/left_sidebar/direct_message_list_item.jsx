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

  render(){
    const { directMessage, directMessageId } = this.props
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
        <span className='channel-list-item-text no-wrap-ellipsis'>{directMessage.name}</span>
      </div>
    )
  }
  
}

export default DirectMessageListItem;