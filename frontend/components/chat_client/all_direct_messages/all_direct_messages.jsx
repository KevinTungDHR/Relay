import React from 'react';
import { Link } from 'react-router-dom';
import ComposerResultUser from '../message_composer/composer_result_user';

class AllDirectMessages extends React.Component {
  constructor(props){
    super(props)

    this.state = { query: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDMs(this.props.workspaceId)
  }

  componentDidUpdate(prevProps, prevState){
    const { workspaceId } = this.props
    if (prevState.query !== this.state.query){
      if (this.state.query === "") {
        this.props.clearQuery();
        return;
      }
      this.props.fetchSearchMembers(workspaceId, this.state.query)
    }
  }

  handleChange(e){
    this.setState({ query: e.target.value });
  }

  render(){
    const { queryUsers, workspaceId, dms } = this.props;

    return(
      <div className='channel-messages-container'>
      <header className='message-composer-header'>
        <div className='message-composer-header-title'>
          Direct Messages
        </div>
      </header>
      <div className='message-composer-new-input'>
        <div>To:</div>
        <div className='message-composer-added-members-list'>
          <input type="text" placeholder='somebody or somebody@example.com' value={this.state.query} onChange={this.handleChange} className='message-composer-input'/>
        </div>
        {this.state.query !== '' && <div className='message-composer-search-results'>
        {queryUsers.map((user, idx) => 
          <Link to={{ pathname: `/client/${this.props.workspaceId}/composer`, allDmsUser: user }} key={idx} >
            <ComposerResultUser 
                user={user} 
                addUser={() => console.log("hi")}/>
          </Link>)}
      </div>}
      </div>
      <div className='client-channel-messages-container-grey'>
        {dms && dms.map((message,idx) => <div key={idx}>{message.body}</div>)}
      </div>
      <div className='text-editor-container'>
        <form className='message-text-editor' >
          <textarea className="text-area-message"></textarea>
          <button className='btn grey-btn-inactive send-message-button'>Send</button>
        </form>
      </div>
    </div>
    )
  }
}

export default AllDirectMessages;