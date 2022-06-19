import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import ComposerResultUser from './composer_result_user';
import MessageComposerListItem from './message_composer_list_item';

class MessageComposer extends React.Component {
  constructor(props){
    super(props);

    this.state = { body: '', query: '', members: {} }
    this.updateForm = this.updateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.createNewDM = this.createNewDM.bind(this);
  }

  handleChange(e){
    this.setState({ query: e.currentTarget.value });
  }

  componentDidUpdate(prevProps, prevState){
    const { workspaceId } = this.props
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

  addUser(user){
    this.setState((state) => {
      return {
        members: Object.assign({}, state.members, { [user.id]: user}),
        query: ''
      }
    })
  }

  removeUser(user){
    this.setState((state)=> {
      const { [user.id]: _, ...rest } = state.members;
      return {
         members: rest
      }
    })
  }

  createNewDM(){
    if(Object.values(this.state.members).length === 0){
      return;
    }
    const directMessage = {
      userIds: Object.keys(this.state.members),
      workspaceId: this.props.workspaceId,
      message: this.state.body
    }

    this.props.createDirectMessage(directMessage, this.props.history.push);
  }

  render(){
    const { queryChannels, queryUsers, workspaceId } = this.props;

    return(
      <div className='channel-messages-container'>
      <header className='message-composer-header'>
        <div className='message-composer-header-title'>
          New Message
        </div>
      </header>
      <div className='message-composer-new-input'>
        <div>To:</div>
        <div className='message-composer-added-members-list'>
          {Object.values(this.state.members).map((member,idx) => <MessageComposerListItem key={idx} user={member} removeUser={() => this.removeUser(member)} />)}
          <input type="text" placeholder={Object.values(this.state.members).length === 0 ? `#a-channel, or somebody@example.com` : ''} value={this.state.query} onChange={this.handleChange} className='message-composer-input'/>
        </div>
        {this.state.query !== '' && <div className='message-composer-search-results'>
          {queryUsers.map((user, idx) => 
            <ComposerResultUser 
                key={idx} 
                user={user} 
                checked={this.state.members[user.id] != undefined}
                addUser={() => this.addUser(user)}/>)}
          {Object.values(this.state.members).length === 0 && queryChannels.map((channel, idx) => <NavLink 
            className='message-composer-channel-item' 
            key={idx} 
            to={`/client/${workspaceId}/C${channel.id}`}>
              {channel.public ? <BsHash /> : <CgLock />}
              <div>{channel.name}</div>
            </NavLink>)}
            {queryUsers.length === 0 && (queryChannels.length === 0 || Object.values(this.state.members).length !== 0) && <div className='message-composer-no-match-item'>No matches</div>}
        </div>}
      </div>
      <div className={Object.values(this.state.members).length === 0 ? 'client-channel-messages-container-grey' : 'client-channel-messages-container' }>
      </div>
      <div className='text-editor-container'>
        <form className='message-text-editor' onSubmit={this.createNewDM}>
          <textarea className="text-area-message" value={this.state.body} onChange={this.updateForm} ></textarea>
          <button className={Object.values(this.state.members).length === 0 ? 'btn grey-btn-inactive send-message-button' : 'btn green-btn send-message-button'}>Send</button>
        </form>
      </div>
    </div>
    )
  }
}

export default MessageComposer;