import React from 'react';
import GetStartedLanding from './get_started_landing';
import LoggedinContent from './loggedin_content';
import LoggedoutContent from './loggedout_content';
class SplashPage extends React.Component {
  constructor(props){
    super(props);
    this.demoLogin = this.demoLogin.bind(this);
  }

  // componentDidUpdate(prevProps){
  //   if(this.props.currentUser && prevProps !== this.props){
  //     this.props.fetchSignedinWorkspaces()
  //   }
  // }

  demoLogin(e){
    e.preventDefault()
    this.props.login({
      email: "DemoUser@gmail.com",
      password: "demouserpassword"
    })
  }

  renderContent(){
    const { currentUser, workspaces } = this.props
    if (currentUser && workspaces.length > 0){
      return <LoggedinContent currentUser={currentUser} workspaces={workspaces}/>
    } else if (currentUser){
      return <GetStartedLanding />
    } else {
      return <LoggedoutContent demoLogin={this.demoLogin}/>

    }
  }

  render(){
    // Why doesn't an if statement work here? It doesn't render correctly
    // const content = currentUser ? 
    //   <LoggedinContent currentUser={currentUser} workplaces={workplaces}/> : <LoggedoutContent demoLogin={this.demoLogin}/>
    return(
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default SplashPage;