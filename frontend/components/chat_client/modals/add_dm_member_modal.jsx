import React from 'react';
import { GrClose } from 'react-icons/gr';
import ComposerResultUser from '../message_composer/composer_result_user';

class AddDmMemberModal extends React.Component {
  constructor(props){
    super(props)

    this.state = { query: '', members: {} }
    this.createNewDM = this.createNewDM.bind(this);
  }

  addUser(user){
    this.setState((state) => {
      return {
        members: Object.assign({}, state.members, { [user.id]: user}),
        query: ''
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
    const { queryUsers, workspaceId } = this.props;

    return(
      <div>
        <div>
          <div>Add People</div>
          <GrClose />
        </div>
        <input 
          className='blue-outline-input' 
          placeholder='Enter a name or email'
          onClick={this.createNewDM}/>
        <button className={Object.values(this.state.members).length === 0 ?  'btn grey-btn-inactive send-message-button' : 'btn green-btn send-message-button'}>Done</button>
        {this.state.query !== '' && <div className='message-composer-search-results'>
          {queryUsers.map((user, idx) => 
            <ComposerResultUser 
                key={idx} 
                user={user} 
                checked={this.state.members[user.id] != undefined}
                addUser={() => this.addUser(user)}/>)}
        </div>}
      </div>
    )
  }
}

export default AddDmMemberModal;