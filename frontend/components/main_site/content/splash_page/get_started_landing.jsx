import React from 'react';
import { NavLink } from 'react-router-dom';

class GetStartedLanding extends React.Component {
  constructor(props){
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  renderWorkspaces(){
    const { currentUser, workspaces } = this.props;

    if (workspaces.length === 0){
      return (
        <section className='no-workspaces-question'>
          <h2>Is your team already on Slack?</h2>
          <p>We couldn’t find any existing workspaces for the email address {currentUser.email}</p>
          <NavLink to='/signin' className='btn grey-alt-button'>Try a Different Email</NavLink>
        </section>
      )
    } else {
      return(
        <div>

        </div>
      )
    }
  }
  handleCreate(e){
    e.preventDefault();
    this.props.createWorkspace()
      .then(() => this.props.history.push('/'))
  }

  render(){
    return(
      <div>
      <section className='get-started-main'>
        <div className='get-started-banner'>
          <div className='left-col'></div>
          <div className='get-started-logo'>
            <img src={window.images.relayRGB} alt="relay-logo-rgb" />
          </div>
          <div className='get-started-confirmed-user'>
            Confirmed as <strong>{this.props.currentUser.email}</strong> <span onClick={this.props.logout}>Log Out</span>
          </div>
        </div>
        

        <div className='get-started-details'>
          <section className='get-started-copy'>
            <h1>Get Started on Slack</h1>
            <p>It’s a new way to communicate with everyone you work with. 
              It’s faster, better organized, and more secure than email — and it’s free to try.</p>
            <button 
              className='btn primary-btn-alt-hover large-lng-btn'
              onClick={this.handleCreate}>Create a Workspace</button>
            <div className='relay-privacy-policy'>By continuing, you’re agreeing to our Customer Terms of Service, User Terms of Service, 
              Privacy Policy, and Cookie Policy.</div>
          </section>
          <img src={window.images.getStarted}/>
        </div>
      </section>
      {this.renderWorkspaces()}
      </div>
    )
  }
}

export default GetStartedLanding;