import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import ChannelsListItemContainer from './channels_list_item_container';

class ChannelsList extends React.Component {
  constructor(props){
    super(props)

    this.state = { isHidden: false }
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList(){
    this.setState((state) => {
      return ({ isHidden: !state.isHidden })
    })
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

  render(){
    const { channels } = this.props;
    const caretClass = this.state.isHidden ? 'rotate-caret-sideways' : 'caret-down'
    return(
      <div className='channels-list-container'>
        <header className='channels-sidebar-heading'>
          <div 
            onClick={this.toggleList} 
            className='channels-header-sml-icon'>
              <FaCaretDown className={caretClass}/>
          </div>
          <span className='channels-sidebar-heading-label' onClick={this.toggleList} >Channels</span>
          <section className='channels-sidebar-heading-buttons'>
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
            isHidden={this.state.isHidden}
            />)}
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