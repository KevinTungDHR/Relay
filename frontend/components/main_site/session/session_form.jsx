import React from 'react';
import Logo from '../../../../app/assets/images/relay_RGB.svg'
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
    this.props.processForm(this.state)
      .then(() => this.props.history.push('/client'))
  }

  render(){
    const heading = this.props.formType === 'Sign In' ? (
      <h1>Sign in to Slack</h1>
    ) : (
      <h1>Sign up for Slack</h1>
    )

    const footer = this.props.formType === 'Sign In' ? (
      <div>
        <p>New to Slack?</p>
        <Link to='/signup'>Create an account</Link>
      </div>
    ) : (
      <div>
        <p>Already using Slack?</p>
        <Link to='/signin'>Sign in to an existing workspace</Link>
      </div>
    )

    const errors = this.props.errors ? (
      <ul>
        {this.props.errors.map((err,idx) => <li key={idx}>{err}</li>)}
      </ul>
    ) : ( null )

    return(
      <div className='session-form-container'>
        <header>
          <div className="left-col"></div>
          <NavLink to='/' className='session-form-logo'>
            <Logo viewBox='0 0 623 200'/>
          </NavLink>
        </header>
        {heading}
        <h2>We suggest using the <strong>email address you use at work.</strong></h2>
        <form onSubmit={this.handleSubmit}>
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
            className='primary-button'
            type="submit" 
            value={this.props.formType} />
        </form>
        {footer}
      </div>
    )
  }
}

export default SessionForm;