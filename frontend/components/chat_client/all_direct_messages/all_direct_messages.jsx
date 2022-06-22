import React from 'react';
import { Link } from 'react-router-dom';
import ComposerResultUser from '../message_composer/composer_result_user';
import AllDMListItemContainer from './all_dm_list_item_container';

class AllDirectMessages extends React.Component {
  constructor(props){
    super(props)

    this.state = { query: '', isLoading: true }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDMs(this.props.workspaceId)
      .then(() => this.setState({ isLoading: false }))

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
    if(this.state.isLoading){
      return null
    }
    const { queryUsers, workspaceId, directMessages } = this.props;

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
                addUser={() => console.log('')}/>
          </Link>)}
      </div>}
      </div>
        <div className='client-channel-messages-container-grey'>
          <div className='all-dm-list-container'>
            {!this.state.isLoading && directMessages.length !== 0 && directMessages.map((dm,idx) => 
            <AllDMListItemContainer key={idx} directMessage={dm}/>)}
          </div>
      </div>
      <div className='text-editor-container'>
        <form className='message-text-editor' >
          <input className="text-area-message" disabled/>
          <button className='btn grey-btn-inactive send-message-button'>Send</button>
        </form>
      </div>
    </div>
    )
  }
}

export default AllDirectMessages;