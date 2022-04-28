import React from "react";
import { HiArrowRight } from 'react-icons/hi'

const GetStartedWorkspaceItem = ({workspace}) => {
  return (
    <>
      <div className="gs-workspace-item">
        <img src={window.images.workspaceIcon} alt='workspace-icon'/>
        <h2 className="gs-workspace-item-details">{workspace.name}</h2>
        <div className="gs-workspace-arrow">
          <HiArrowRight />
        </div>
      </div>
      <hr className="gs-workspace-item-divider"/>
    </>
  )
}

export default GetStartedWorkspaceItem