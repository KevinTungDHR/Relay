import React from 'react';
import LoggedinContent from './loggedin_content';
import LoggedoutContent from './loggedout_content';
import { Redirect } from 'react-router-dom';

class SplashPage extends React.Component {
  constructor(props){
    super(props);
    this.demoLogin = this.demoLogin.bind(this);
    this.state = { isFetched: false, count: 3 }
  }


  componentDidMount(){
    if(this.props.currentUser){
      this.props.fetchSignedinWorkspaces()
      .then(() => this.setState({ isFetched: true }))
    } else {
      this.setState({ isFetched: true })
    }
  }

  demoLogin(e){
    e.preventDefault()
    this.props.login({
      email: "DemoUser@gmail.com",
      password: "demouserpassword"
    })
  }

  renderContent(){
    if (this.state.isFetched){
      const { currentUser, workspaces } = this.props
      if (currentUser && workspaces.length > 0){
        return <LoggedinContent currentUser={currentUser} workspaces={workspaces} count={this.state.count}/>
      } else if (currentUser) {
        return <Redirect to='get-started'/>
      } else {
        return <LoggedoutContent demoLogin={this.demoLogin}/>
      }
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