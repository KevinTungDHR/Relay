import React from "react";
import { IoChatbubblesOutline, IoEllipsisVertical } from "react-icons/io5";
import { BsChatText } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import { VscMention } from 'react-icons/vsc'

const StaticSidebarList = (props) => {
  return (
    <div className='c-workspace-sidebar-list'>
    <div className='c-workspace-sidebar-static-item'>
      <div className='c-workspace-sidebar-static-link'>
        <BsChatText className='static-icon flip-horizontally'/>
        <span className="no-wrap-ellipsis">Threads</span>
      </div>
    </div>
    <div className='c-workspace-sidebar-static-item'>
      <div className='c-workspace-sidebar-static-link'>
        <IoChatbubblesOutline className='static-icon'/>
        <span className="no-wrap-ellipsis">All DMs</span>
      </div>
    </div>
    <div className='c-workspace-sidebar-static-item'>
      <div className='c-workspace-sidebar-static-link'>
        <VscMention className='static-icon'/>
        <span className='no-wrap-ellipsis'>Mentions & reactions</span>
      </div>
    </div>
    <div className='c-workspace-sidebar-static-item'>
      <div className='c-workspace-sidebar-static-link'>
        <BiBuildings className='static-icon flip-horizontally'/>
        <span className="no-wrap-ellipsis">Slack Connect</span>
      </div>
    </div>
    <div className='c-workspace-sidebar-static-item'>
      <div className='c-workspace-sidebar-static-link'>
        <div className='vertical-ellipsis-icon-container'>
          <IoEllipsisVertical />
        </div>
        <span className="no-wrap-ellipsis">More</span>
      </div>
    </div>
  </div>
  )
}

export default StaticSidebarList;