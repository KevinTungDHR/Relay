import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import consumer from '../../../consumer';
class ChannelsListItem extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
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
    this.props.history.push(newPath)
  }

  componentDidMount(){
    this.enterChannel()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render(){
    const {channel, openOptionsModal} = this.props

    return(
      <div onClick={this.handleClick} className='channel-list-item' onContextMenu={openOptionsModal}>
        <div className='channel-list-item-icon-container'>
          {channel.public ? <BsHash /> : <CgLock className='channel-list-lock-icon' />}
        </div>
        <span className='channel-list-item-text no-wrap-ellipsis'>{channel.name}</span>
      </div>
    )
  }
  
}

export default ChannelsListItem;