import React from "react";
import { IoChatbubblesOutline, IoEllipsisVertical } from "react-icons/io5";
import { BsChatText } from "react-icons/bs";
// import { VscMention } from 'react-icons/vsc'

class StaticSidebarList extends React.Component {
  constructor(props){
    super(props)

    this.browseChannels = this.browseChannels.bind(this);
    this.allDms = this.allDms.bind(this);
  }

  browseChannels(e){
    e.preventDefault()

    const { fullPath, url } = this.props
    const { workspaceId } = this.props.match.params 

    const regexp = new RegExp(url)
    const newPath = fullPath.replace(regexp, `/client/${workspaceId}/browse-channels`);
    this.props.history.push(newPath)
  }

  allDms(e){
    e.preventDefault()

    const { fullPath, url } = this.props
    const { workspaceId } = this.props.match.params 

    const regexp = new RegExp(url)
    const newPath = fullPath.replace(regexp, `/client/${workspaceId}/all-dms`);
    this.props.history.push(newPath)
  }

  render(){
    return (
      <div className='c-workspace-sidebar-list'>
      <div className='c-workspace-sidebar-static-item'>
        <div className='c-workspace-sidebar-static-link' onClick={this.browseChannels}>
          <BsChatText className='static-icon'/>
          <span className="no-wrap-ellipsis">Browse Channels</span>
        </div>
      </div>
      <div className='c-workspace-sidebar-static-item'>
        <div className='c-workspace-sidebar-static-link' onClick={this.allDms}>
          <IoChatbubblesOutline className='static-icon'/>
          <span className="no-wrap-ellipsis">All DMs</span>
        </div>
      </div>
      {/* <div className='c-workspace-sidebar-static-item'>
        <div className='c-workspace-sidebar-static-link'>
        
          <VscMention className='static-icon'/>
          <span className='no-wrap-ellipsis'>Mentions & reactions</span>
        </div>
      </div> */}
      {/* <div className='c-workspace-sidebar-static-item'>
        <div className='c-workspace-sidebar-static-link'>
          <div className='vertical-ellipsis-icon-container'>
            <IoEllipsisVertical />
          </div>
          <span className="no-wrap-ellipsis">More</span>
        </div>
      </div> */}
    </div>
    )
  }
}

export default StaticSidebarList;