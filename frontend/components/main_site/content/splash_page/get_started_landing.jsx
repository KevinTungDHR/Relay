import React from 'react';

class GetStartedLanding extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <img src={window.images.relayRGB} alt="relay-logo-rgb" />
        <div>
          <section>
            <h1>Get Started on Slack</h1>
            <p>It’s a new way to communicate with everyone you work with. 
              It’s faster, better organized, and more secure than email — and it’s free to try.</p>
            <button>Create a Workspace</button>
            <div>By continuing, you’re agreeing to our Customer Terms of Service, User Terms of Service, 
              Privacy Policy, and Cookie Policy.</div>
          </section>
          <img src={window.images.getStarted}/>
        </div>
      </div>
    )
  }
}

export default GetStartedLanding;