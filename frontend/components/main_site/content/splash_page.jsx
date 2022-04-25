import React from 'react';
import { NavLink } from 'react-router-dom';
import Placeholder from '../../../../app/assets/images/placeholder.svg';
class SplashPage extends React.Component {
  constructor(props){
    super(props);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin(e){
    e.preventDefault()
    this.props.login({
      email: "JimHalpert@DunderMifflin.com",
      password: "demouserpassword"
    })
  }

  render(){
    const splashPageLink = this.props.currentUser ? (
      <NavLink to='/client' className='secondary-button'>Launch Relay</NavLink>
    ) : (
      <span onClick={this.demoLogin} className='secondary-button'>Demo Login</span>
    )
    return(
      <div className='main-content'>
        <div className='billboard'>
          <section className='content-container-one'>
            <div className='content-one-copy'>
              <h1 className='splash-jumbo-headline'>Relay is your digital HQ</h1>
              <p>Transform the way you work with one place for everyone and everything you need to get stuff done.</p>
              <div className='billboard-session-links'>
                <NavLink className='primary-button' to='/signin'>Sign in</NavLink>
                {splashPageLink}
              </div>
            </div>
            <div className='splash-illustration-one'>
              <Placeholder viewBox='0 0 600 300'/>
            </div>
          </section>
          <section className='brands-list'>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div >
              <Placeholder viewBox='0 0 600 300'/>
            </div>
          </section>
          <section className='content-container-two'>
            <div className='splash-illustration-one left-align'>
              <Placeholder viewBox='0 0 600 300'/>
            </div>
            <div className='content-two-copy'>
              <h2 className='splash-large-headline'>Now is your moment to build a better tomorrow</h2>
              <p>We’ve seen what the future can be. Now it’s time to decide what it will be.</p>
              <div className='content-container-two-links'>
                <span className='secondary-button'>Watch Video</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default SplashPage;