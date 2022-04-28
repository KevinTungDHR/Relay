import React from 'react';
import { NavLink } from 'react-router-dom';
import GetStartedWorkspaceItem from './get_started_workspace_item'
class GetStartedLanding extends React.Component {
  constructor(props){
    super(props);
    this.handleCreate = this.handleCreate.bind(this);

    this.state = { isFetched: false, count: 5 }
  }

  componentDidMount(){
    this.props.fetchSignedinWorkspaces()
      .then(() => this.setState({ isFetched: true }))
  }

  renderListFooter(){
    const { workspaces } = this.props;

    if (workspaces.length < this.state.count ){
      return (
        <div className='gs-workspaces-list-footer'>

        </div>
      )
    } else  if(workspaces.length > this.state.count) {
      return (
        <div className='gs-workspaces-list-footer'>

        </div>
      )
    } else {
      return (
        <div className='gs-workspaces-list-footer'>

        </div>
      )
    }
  }

  renderWorkspaces(){
    if (!this.state.isFetched) {
      return null;
    }

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
          <div className='gs-your-workspaces'>
            <div className='get-started-divider'>OR</div>
            <h2>Open a workplace</h2>
            <section className="gs-workspaces-list">
              <div className='gs-workspaces-list-header'>
                <h3>Workspaces for <strong>{currentUser.email}</strong></h3>
              </div>
              <hr className="gs-workspace-item-divider"/>
              {workspaces.slice(0, this.state.count)
                .map((workspace, idx)=> <GetStartedWorkspaceItem key={idx} workspace={workspace}/>)}
              {this.renderListFooter()}
            </section>
          </div>
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
        
        <div className='gs-content-container'>
          <div className='gs-top-billboard'>
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
          </div>

          {this.renderWorkspaces()}
        </div>
      </section>
      </div>

    )
  }
}

export default GetStartedLanding;