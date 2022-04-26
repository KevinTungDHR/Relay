import React from 'react';
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
            <div className='billboard-workspaces-flex'>
              <div className="workplace-description">
                <div className='billboard-workspace-description'>
                  <h3>Current Workspace</h3>
                  <p>5,623 members</p>
                </div>
              </div>
              <div className="billboard-button-container">
                <NavLink className='primary-button billboard-button' to='/client'>Launch Relay</NavLink>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  )
}

export default LoggedinContent;