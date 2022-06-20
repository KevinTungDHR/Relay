import React from 'react';
import { GrClose } from 'react-icons/gr';
import ComposerResultUser from '../message_composer/composer_result_user';
import MessageComposerListItem from '../message_composer/message_composer_list_item';

class AddDmMemberModal extends React.Component {
  constructor(props){
    super(props)

    this.state = { query: '', members: {} }
    this.createNewDM = this.createNewDM.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.addInputRef = React.createRef()
    this.focusInput = this.focusInput.bind(this);
  }

  addUser(user){
    this.setState((state) => {
      return {
        members: Object.assign({}, state.members, { [user.id]: user}),
        query: ''
      }
    })
  }

  componentDidMount(){
    window.addEventListener('mousedown', (e) =>{
      if(e.target.classList.contains('second-modal') && e.button === 0){
        this.props.closeModal();
      }
    })
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

  createNewDM(){
    if(Object.values(this.state.members).length === 0){
      return;
    }
    const userIds = this.props.directMessages[this.props.directMessageId].subscriptionIds.map((id) => this.props.subscriptions[id].userId)
    const directMessage = {
      userIds: Object.keys(this.state.members).concat(userIds),
      workspaceId: this.props.workspaceId,
      message: this.state.body
    }

    this.props.createDirectMessage(directMessage, this.props.history.push);
    this.props.closeModal();
    this.props.closeParentModal();
  }

  removeUser(user){
    this.setState((state)=> {
      const { [user.id]: _, ...rest } = state.members;
      return {
         members: rest
      }
    })
  }

  focusInput(){
    this.addInputRef.current.focus()
  }

  handleChange(e){
    this.setState({ query: e.target.value })
  }
  render(){
    const { queryUsers, workspaceId } = this.props;

    return(
      <div className='second-modal second-dark-modal '>
        <div className='direct-message-add-member-content'>
          <div className='direct-message-modal-header'>
            <div  className='direct-message-modal-title'>Add People</div>
            <GrClose className='direct-message-modal-close' onClick={this.props.closeModal}/>
          </div>
          <div className='message-composer-added-members-list blue-outline-input' onClick={this.focusInput}>
            {Object.values(this.state.members).map((member,idx) => <MessageComposerListItem key={idx} user={member} removeUser={() => this.removeUser(member)} />)}
            <input 
              ref={this.addInputRef} 
              className='direct-message-modal-input' 
              placeholder={Object.values(this.state.members).length === 0 ? 'Enter a name or email' : '' }
              onChange={this.handleChange}
              value={this.state.query}/>
            {this.state.query !== '' && <div className='direct-message-modal-search-results'>
            {queryUsers.map((user, idx) => 
              <ComposerResultUser 
                  key={idx} 
                  user={user} 
                  checked={this.state.members[user.id] != undefined}
                  addUser={() => this.addUser(user)}/>)}
              {queryUsers.length === 0 && Object.values(this.state.members).length !== 0 && <div className='message-composer-no-match-item'>No matches</div>}
          </div>}
          </div>
          <button 
            className={Object.values(this.state.members).length === 0 ?  
              'btn grey-btn-inactive send-message-button' : 'btn green-btn send-message-button'}
            onClick={this.createNewDM}
              >Done</button>
          
        </div>
      </div>
    )
  }
}

export default AddDmMemberModal;