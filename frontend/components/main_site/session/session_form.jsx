import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: "", password: "" }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field){
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  componentDidMount(){
    this.props.removeErrors();
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.processForm(user)
      .then(() => this.props.history.push("/"))
  }

  render(){
    const heading = this.props.formType === 'Sign In' ? (
      <h1>Sign in to Relay</h1>
    ) : (
      <h1>Sign up for Relay</h1>
    )

    const formSwitch = this.props.formType === 'Sign In' ? (
      <div className='session-form-switch'>
        <p>New to Relay?</p>
        <Link to='/signup'>Create an account</Link>
      </div>
    ) : (
      <div className='session-form-switch'>
        <p>Already using Relay?</p>
        <Link to='/signin'>Sign in to an existing workspace</Link>
      </div>
    )

    const errors = this.props.errors.length !== 0 ? (
      <ul>
        {this.props.errors.map((err,idx) => <li key={idx}>{err}</li>)}
      </ul>
    ) : ( null )

    return(
      <div className='session-page'>
        <div className='session-form-container'>
          <header className='session-form-header'>
            <NavLink to='/'className='session-form-logo'>
              <img src={window.images.relayRGB} alt="relay-logo-RGB" />
            </NavLink>
          </header>
          {heading}
          <h2>We suggest using the <strong>email address you use at work.</strong></h2>
          <div className='horizontal-content-rule'>
            <hr />
          </div>
          <form onSubmit={this.handleSubmit} className='session-form'>
            <input 
              type="text" 
              placeholder='name@work-email.com'
              value={this.state.username}
              onChange={this.update('email')}/>
              {errors}
            <input 
              type="password"
              placeholder='Enter password'
              value={this.state.password}
              onChange={this.update('password')}/>
            <input 
              className='btn primary-btn-alt-hover full-width-btn-bold '
              type="submit" 
              value={this.props.formType} />
          </form>
          {formSwitch}
          <footer className='session-form-footer'>
            <a href="https://github.com/KevinTungDHR/Relay" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/kevintungmedia/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </footer>
        </div>
      </div>
      
    )
  }
}

export default SessionForm;