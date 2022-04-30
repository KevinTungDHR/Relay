import React from 'react';
import { HiChevronDown, HiOutlinePencilAlt } from 'react-icons/hi'
import StaticSidebarList from './static_sidebar_list';
import ChannelsListContainer from './channels_list_container';

class ClientSidebar extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    const { workspace } = this.props
    if (!workspace){
      return null;
    }
    return(
      <>
          <section className='c-workspace-sidebar'>
            <header className='c-workspace-sidebar-header'>
              <button className='c-ws-sidebar-header-detail-btn'>
                <span className='c-ws-sidebar-header-text'>{workspace.name}</span>
                <HiChevronDown />
              </button>
              <button className='c-ws-sidebar-header-new-message-btn'>
                <HiOutlinePencilAlt className='new-message-pencil-icon'/>
              </button>
            </header>
            <StaticSidebarList />
            <ChannelsListContainer />
          </section>
      </>
    )
  }
}

export default ClientSidebar;