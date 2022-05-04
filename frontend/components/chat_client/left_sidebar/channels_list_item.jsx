import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import consumer from '../../../consumer';
class ChannelsListItem extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)

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

  handleClick(){
    const { fullPath, url, channel } = this.props
    const regexp = new RegExp(url)

    const newPath = fullPath.replace(regexp, `/client/${channel.workspaceId}/${channel.id}`);
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

  handleRightClick(e){
    this.props.openOptionsModal(e, this.props.channel)
  }

  render(){
    const {channel} = this.props
    const activeChannel = this.props.match.params.channelId == channel.id ? "active-channel" : ""
    const isHidden = this.props.isHidden && !activeChannel ? "hidden" : ""
    return(
      <div onClick={this.handleClick} className={`channel-list-item ${activeChannel} ${isHidden}`}  onContextMenu={this.handleRightClick}>
        <div className='channel-list-item-icon-container'>
          {channel.public ? <BsHash /> : <CgLock className='channel-list-lock-icon' />}
        </div>
        <span className='channel-list-item-text no-wrap-ellipsis'>{channel.name}</span>
      </div>
    )
  }
  
}

export default ChannelsListItem;