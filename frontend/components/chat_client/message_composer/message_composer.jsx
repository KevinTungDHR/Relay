import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import ComposerResultUser from './composer_result_user';

class MessageComposer extends React.Component {
  constructor(props){
    super(props);

    this.state = { body: '', query: ''}
    this.updateForm = this.updateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ query: e.currentTarget.value });
  }

  componentDidUpdate(prevProps, prevState){
    const { workspaceId } = this.props.match.params
    if (prevState.query !== this.state.query){
      if (this.state.query === "") {
        this.props.clearQuery();
        return;
      }
      this.props.fetchSearchQuery(workspaceId, this.state.query)
    }
  }

  updateForm(e){
    this.setState({
      body: e.target.value
    })
  }

  clickUser(){

  }

  render(){
    const { queryChannels, queryUsers, query, workspaceId } = this.props;

    return(
      <div className='channel-messages-container'>
      <header className='message-composer-header'>
        <div className='message-composer-header-title'>
          New Message
        </div>
      </header>
      <div className='message-composer-new-input'>
        <div>To:</div>
        <input type="text" placeholder='#a-channel, or somebody@example.com' value={query} onChange={this.handleChange}/>
        {this.state.query !== '' && <div className='message-composer-search-results'>
          {queryUsers.map((user, idx) => <ComposerResultUser 
            key={idx} 
            user={user} 
            handleClick={this.clickUser}/>)}
          {queryChannels.map((channel, idx) => <NavLink 
            className='message-composer-channel-item' 
            key={idx} 
            to={`/client/${workspaceId}/C${channel.id}`}>
              {channel.public ? <BsHash /> : <CgLock />}
              <div>{channel.name}</div>
            </NavLink>)}
            {queryUsers.length === 0 && queryChannels.length === 0 && <div className='message-composer-no-match-item'>No matches</div>}
        </div>}
      </div>
      <div className='client-channel-messages-container'>
      </div>
      <div className='text-editor-container'>
        <form className='message-text-editor' onSubmit={this.sendMessage}>
          <textarea className="text-area-message" value={this.state.body} onChange={this.updateForm} ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
    )
  }
}

export default MessageComposer;