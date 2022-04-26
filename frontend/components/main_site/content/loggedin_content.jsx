import React from 'react';
import {NavLink} from 'react-router-dom';

const LoggedinContent = ({currentUser}) => {
  return(
    <div className='main-content'>
      <section className='billboard-section-purple'>
        <div className='billboard-loggedin-content'>
          <header className='welcome-banner'>
            <img src={window.images.wavingHand} alt="waving-hand" />
            <h1>Welcome back</h1>
          </header>
          
          <div className="billboard-alt-container">
            <header className='billboard-workspaces-header'>
              <h2>Workspaces for {currentUser.email}</h2>
            </header>
            {/* This will be one item that you dynamically generate */}
            <div className='billboard-workspace-item'>
              <img src={window.images.workspaceIcon} alt="workspace-icon" />
              <div className="billboard-workspace-description">
                <h3>Current Workspace</h3>
                <p>5,623 members</p>
              </div>
              <NavLink className='btn primary-btn full-width-btn grid-span-2' to='/client'>Launch Relay</NavLink>
            </div>
          </div>

          <div className='billboard-alt-container alt-grid'>
            <h2>Want to use Slack with a different team?</h2>
            <div>
              <button className='btn secondary-btn full-width-btn'>CREATE A NEW WORKSPACE</button>
            </div>
            <img src={window.images.womenLaptop} alt="woman-with-laptop" />
          </div>
        </div>

        <section className='loggedin-promos'>
          <div>
            <img />
          </div>
        </section>

        <section className='loggedin-splash-footer'>
          
        </section>
      </section>
    </div>
  )
}

export default LoggedinContent;