import React from 'react';
import Placeholder from '../../../../app/assets/images/placeholder.svg';
import {NavLink} from 'react-router-dom';

const LoggedinContent = ({currentUser}) => {
  return(
    <div className='main-content'>
      <section className='billboard bg-purple'>
        <div className='hero-container-one'>
          <header>Welcome back</header>
          <div className="billboard-workspaces-container">
            <header>
              <p>Workspaces for {currentUser.email}</p>
            </header>
            <div className='billboard-workspaces-grid'>
              <div >
                <Placeholder className='workspace-icon' viewBox='0 0 600 300'/>
              </div>
              <div >
                <h3>Current Workspace</h3>
                <p>5,623 members</p>
              </div>
              <NavLink className='primary-button' to='/client'>Launch Relay</NavLink>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  )
}

export default LoggedinContent;