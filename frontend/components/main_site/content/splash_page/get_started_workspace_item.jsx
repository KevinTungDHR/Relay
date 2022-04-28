import React from "react";
import { HiArrowRight } from 'react-icons/hi'
import { NavLink } from "react-router-dom";

const GetStartedWorkspaceItem = ({workspace}) => {
  return (
    <>
      <NavLink to={`/client/${workspace.id}`} className="gs-workspace-item">
        <img src={window.images.workspaceIcon} alt='workspace-icon'/>
        <h2 className="gs-workspace-item-details">{workspace.name}</h2>
        <div className="gs-workspace-arrow">
          <HiArrowRight />
        </div>
      </NavLink>
      <hr className="gs-workspace-item-divider"/>
    </>
  )
}

export default GetStartedWorkspaceItem