import React from 'react';
import { HiChevronDown, HiOutlinePencilAlt } from 'react-icons/hi'
import StaticSidebarList from './static_sidebar_list';


class ClientSidebarIndex extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <>
          <section className='c-workspace-sidebar'>
            <header className='c-workspace-sidebar-header'>
              <button className='c-ws-sidebar-header-detail-btn'>
                <span className='c-ws-sidebar-header-text'>App Academy</span>
                <HiChevronDown />
              </button>
              <button className='c-ws-sidebar-header-new-message-btn'>
                <HiOutlinePencilAlt className='new-message-pencil-icon'/>
              </button>
            </header>
            <StaticSidebarList />
          </section>
      </>
    )
  }
}

export default ClientSidebarIndex;