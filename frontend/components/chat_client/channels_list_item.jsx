import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { NavLink } from 'react-router-dom';

const ChannelsListItem = ({channel, openOptionsModal}) => {
  return(
    <NavLink to={`/client/${channel.workspaceId}/${channel.id}`} className='channel-list-item' onContextMenu={openOptionsModal}>
      <div className='channel-list-item-icon-container'>
        {channel.public ? <BsHash /> : <CgLock className='channel-list-lock-icon' />}
      </div>
      <span className='channel-list-item-text no-wrap-ellipsis'>{channel.name}</span>
    </NavLink>
  )
}

export default ChannelsListItem;