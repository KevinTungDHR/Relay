import React from 'react';
import {NavLink} from 'react-router-dom';
import SplashWorkspaceItem from './splash_workspace_item';

class LoggedinContent extends React.Component {
  constructor(props){
    super(props)

    this.state = { count: 3 }
    this.showMoreWorkspaces = this.showMoreWorkspaces.bind(this);
    this.showFewerWorkspaces = this.showFewerWorkspaces.bind(this);
  }

  showMoreWorkspaces(){
    this.setState((state) => {
      if (state.count + 3 > this.props.workspaces.length){
        return ({count: this.props.workspaces.length })
      } else {
        return ({count: state.count + 3})
      }
    })
  }
  showFewerWorkspaces(){
    this.setState((state) => {
      if (state.count - 3 > this.props.workspaces.length){
        return ({count: this.props.workspaces.length })
      } else {
        return ({count: state.count - 3})
      }
    })
  }

  renderListFooter(){
    const { workspaces } = this.props;

    if (workspaces.length < this.state.count ){
      return (
        <div className='billboard-workspaces-list-footer'>
        </div>
      )
    } else  if(workspaces.length > this.state.count) {
      return (
        <div className='billboard-workspaces-list-footer'>
          <div onClick={this.showMoreWorkspaces} 
            className="billboard-workspaces-list-show">Show more workspaces</div>
        </div>
      )
    } else {
      return (
        <div className='billboard-workspaces-list-footer'>
          <div onClick={this.showFewerWorkspaces} 
            className="billboard-workspaces-list-show">Show fewer workspaces</div>
        </div>
      )
    }
  }

  render(){
    const {currentUser, workspaces } = this.props

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
              {workspaces.slice(0, this.state.count)
                  .map((workspace, idx)=> <SplashWorkspaceItem key={idx} workspace={workspace}/>)}
              {this.renderListFooter()}
            
            </div>
  
            <div className='billboard-alt-container alt-grid'>
              <h2>Want to use Relay with a different team?</h2>
              <div>
                <NavLink to='/get-started' className='btn secondary-btn full-width-btn'>CREATE A NEW WORKSPACE</NavLink>
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
  
}

export default LoggedinContent;