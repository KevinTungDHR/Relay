import React from 'react';
import LoggedinContent from './loggedin_content';
import LoggedoutContent from './loggedout_content';
class SplashPage extends React.Component {
  constructor(props){
    super(props);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin(e){
    e.preventDefault()
    this.props.login({
      email: "DemoUser@gmail.com",
      password: "demouserpassword"
    })
  }

  render(){
    const { currentUser } = this.props
    const content = currentUser ? 
      <LoggedinContent currentUser={currentUser}/> : <LoggedoutContent demoLogin={this.demoLogin}/>
    return(
      <div>
        {content}
      </div>
    )
  }
}

export default SplashPage;