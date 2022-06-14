import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import consumer from '../../../consumer';
class ChannelsListItem extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.openOptionsModal = this.openOptionsModal.bind(this)
  }

  enterChannel(){
    this.subscription = consumer.subscriptions.create(
      { channel: 'WorkspaceChannel', id: `${this.props.channel.id}`, type: 'Channel' },
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
        channelId: this.props.channel.id
      }

      this.props.showModal(modal);
    }
  }

  handleClick(){
    const { fullPath, url, channel } = this.props
    const regexp = new RegExp(url)

    const newPath = fullPath.replace(regexp, `/client/${channel.workspaceId}/C${channel.id}`);
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
    const { channel, channelId } = this.props
    const activeChannel = channelId == channel.id ? "active-channel" : ""
    const isHidden = this.props.isHidden && !activeChannel ? "hidden" : ""
    return(
      <div 
      className={`channel-list-item ${activeChannel} ${isHidden}`}  
      onClick={this.handleClick} 
      onContextMenu={this.openOptionsModal('channel-options-modal')}>
        <div className='channel-list-item-icon-container'>
          {channel.public ? <BsHash /> : <CgLock className='channel-list-lock-icon' />}
        </div>
        <span className='channel-list-item-text no-wrap-ellipsis'>{channel.name}</span>
      </div>
    )
  }
  
}

export default ChannelsListItem;