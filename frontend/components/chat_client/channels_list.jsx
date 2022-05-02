import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import { IoEllipsisVertical } from 'react-icons/io5';
import ChannelsListItemContainer from './channels_list_item_container';

class ChannelsList extends React.Component {
  constructor(props){
    super(props)

  }
  
  showModal(name){
    return e => {
      const { right, bottom } = e.currentTarget.getBoundingClientRect()
      const modal = {
        name: name,
        posX: right,
        posY: bottom
      }
      this.props.showModal(modal);
    }
  }
  
  openOptionsModal(name){
    return e => {
      e.preventDefault();
      const modal = {
        name: name,
        posX: e.clientX,
        posY: e.clientY
      }

      this.props.showModal(modal);
    }
  }

  render(){
    const { channels } = this.props;

    return(
      <div className='channels-list-container'>
        <header className='channels-sidebar-heading'>
          <div className='channels-header-sml-icon'>
            <FaCaretDown />
          </div>
          <span className='channels-sidebar-heading-label'>Channels</span>
          <section className='channels-sidebar-heading-buttons'>
            <div className='channels-header-sml-icon channels-header-options'>
              <IoEllipsisVertical />
            </div>
            <div 
              className='channels-header-sml-icon channels-header-add'
              onClick={this.showModal('channel-header-add-channel')}>
              <BiPlus className='channel-header-add-icon'/>
            </div>
          </section>
        </header>
        <div className='channels-list-index'>
          {channels && channels.map((channel,idx) => 
          <ChannelsListItemContainer 
            channel={channel} 
            key={idx} 
            openOptionsModal={this.openOptionsModal('channel-options-modal')}/>)}
          <div className='channel-list-item' onClick={this.showModal('channel-footer-add-channel')}>
            <div className='channel-footer-add-icon-container'>
              <BiPlus className='channel-footer-add-icon'/>
            </div>
            <span className='channel-list-item-text no-wrap-ellipsis'>Add channels</span>
            
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelsList;