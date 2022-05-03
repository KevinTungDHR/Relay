import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { NavLink } from 'react-router-dom';
import consumer from '../../consumer';
class ChannelsListItem extends React.Component {
  constructor(props){
    super(props)

  }

  enterChannel(){
    this.subscription = consumer.subscriptions.create(
      { channel: 'WorkspaceChannel', id: `${this.props.channel.id}`, type: 'Channel' },
      {
        received: ({message, user}) => {
         this.props.receiveMessage(message);
         this.props.receiveUser(user);
        }
      }
    );
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
      <NavLink to={`/client/${channel.workspaceId}/${channel.id}`} className='channel-list-item' onContextMenu={openOptionsModal}>
        <div className='channel-list-item-icon-container'>
          {channel.public ? <BsHash /> : <CgLock className='channel-list-lock-icon' />}
        </div>
        <span className='channel-list-item-text no-wrap-ellipsis'>{channel.name}</span>
      </NavLink>
    )
  }
  
}

export default ChannelsListItem;