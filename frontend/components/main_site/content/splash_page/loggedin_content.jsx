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
            <h2>Want to use Relay with a different team?</h2>
            <div>
              <button className='btn secondary-btn full-width-btn'>CREATE A NEW WORKSPACE</button>
            </div>
            <img src={window.images.womenLaptop} alt="woman-with-laptop" />
          </div>
        </div>
      </section>

      <section className='loggedin-promos-container'>
        <h2 className='loggedin-promo-header'>Learn how to use Relay for work</h2>
        <section className='loggedin-promos-grid'>
          <div className='loggedin-promo-item'>
            <img src={window.images.loggedinPromo1} alt="logged-in-promo1"/>
            <h2>See how Relay works for all kinds of teams</h2>
          </div>

          <div className='loggedin-promo-item'>
            <img src={window.images.loggedinPromo2} alt="logged-in-promo2"/>
            <h2>Introducing Relay Connect: the future of business</h2>
          </div>
          <div className='loggedin-promo-item'>
          <img src={window.images.loggedinPromo3} alt="logged-in-promo3"/>
            <h2>How to use channels to organize your work life</h2>
          </div>
        </section>
      </section>
     

      <section className='loggedin-splash-footer'>
        <div className='footer-hr-separator'>
          <hr />
        </div>
        <section className='footer-personal-links'>
          <a href="https://github.com/KevinTungDHR/Relay" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/kevintungmedia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </section>
      </section>
    </div>
  )
}

export default LoggedinContent;