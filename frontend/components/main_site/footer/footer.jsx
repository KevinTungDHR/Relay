import React from 'react';

class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <section className='footer'>
        <section className='curved-purple-bg'>
          <div className='footer-content larger'>
            <h1>Welcome to where the future works</h1>
          </div>
        </section>

        <section className='footer-personal-links'>
          <a href="https://github.com/KevinTungDHR/Relay" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/kevintungmedia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </section>
      </section>
    )
  }
}

export default Footer;