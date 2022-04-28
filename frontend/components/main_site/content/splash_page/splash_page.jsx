import React from 'react';
import GetStartedLanding from './get_started_landing';
import LoggedinContent from './loggedin_content';
import LoggedoutContent from './loggedout_content';

class SplashPage extends React.Component {
  constructor(props){
    super(props);
    this.demoLogin = this.demoLogin.bind(this);

    this.state = { isFetched: false }
  }

  // Handles refresh of page

  componentDidMount(){
    if (!this.props.currentUser){
      this.setState({ isFetched: true })
    } else {
      this.props.fetchSignedinWorkspaces().then(() => {
        this.setState({ isFetched: true })
      })
    }
  }

  componentDidUpdate(prevProps){
    console.log(this.state.isFetched)

    const { currentUser } = this.props;
    if (
      currentUser && 
      prevProps.currentUser !== currentUser
    ){
      this.props.fetchSignedinWorkspaces()
        .then(()=>this.setState({isFetched: true}))
    }
  }

  demoLogin(e){
    e.preventDefault()
    this.setState({ isFetched: false }, () => {
      this.props.login({
        email: "DemoUser@gmail.com",
        password: "demouserpassword"
      })
      }
    )
  }

  renderContent(){
    if (!this.state.isFetched) {
      return null;
    }
    const { currentUser, workspaces } = this.props

    if (currentUser && workspaces.length > 0){
      return <LoggedinContent currentUser={currentUser} workspaces={workspaces}/>
    } else if (currentUser) {
      return <GetStartedLanding />
    } else {
      return <LoggedoutContent demoLogin={this.demoLogin}/>
    }
  }

  render(){
    return(
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default SplashPage;