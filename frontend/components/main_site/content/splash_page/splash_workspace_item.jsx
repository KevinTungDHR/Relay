import React from "react";
import { NavLink } from "react-router-dom";

const SplashWorkspaceItem = ({workspace}) => {
  const length = workspace.subscriptionIds.length
  return (
    <>
      <div className='billboard-workspace-item'>
        <img src={window.images.workspaceIcon} alt="workspace-icon" />
        <div className="billboard-workspace-description">
          <h3>{workspace.name}</h3>
          <h2>{length > 1 ? `${length} members` : `1 member`}
          </h2>
        </div>
        <NavLink className='btn primary-btn full-width-btn grid-span-2' to={`/client/${workspace.id}`}>Launch Relay</NavLink>
      </div>
    </>
    
  )
}

export default SplashWorkspaceItem