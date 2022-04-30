import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import { IoEllipsisVertical } from 'react-icons/io5';


class ChannelsList extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className='channels-list-container'>
        <header className='channels-sidebar-heading'>
          <div className='channels-list-expand-icon channels-header-sml-icon'>
            <FaCaretDown />
          </div>
          <span className='channels-sidebar-heading-label'>Channels</span>
          <section className='channels-sidebar-heading-buttons'>
            <div className='channels-header-sml-icon channels-header-options'>
              <IoEllipsisVertical />
            </div>
            <div className='channels-header-sml-icon channels-header-add'>
              <BiPlus />
            </div>
          </section>
        </header>
        <div className='channels-list-index'>
          
        </div>
      </div>
    )
  }
}

export default ChannelsList;