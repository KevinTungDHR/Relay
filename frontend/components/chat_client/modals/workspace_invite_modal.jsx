import React from 'react';
import { GrClose } from 'react-icons/gr';
import WorkspaceInviteListItem from './workspace_invite_list_item';

class WorkspaceInviteModal extends React.Component {
  constructor(props){
    super(props);
    this.state = { emails: [], nextUser: '' }
    this.addInputRef = React.createRef()
    this.focusInput = this.focusInput.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleKeyPressed(e){
    if(e.keyCode === 13 || e.keyCode == 32){
      if(this.state.nextUser.trim() === ''){
        return;
      }

      if(this.state.emails.includes(this.state.nextUser)){
        this.setState({ nextUser: '' })
        return;
      }
      // or space
      this.setState((state) => {
        return {
          emails: [...state.emails, this.state.nextUser.trim()],
          nextUser: ''
        }
      })
    }
  }

  removeUser(email){
    this.setState((state) => {
      return {
        emails: state.emails.filter(el => el !== email)
      }
    })
  }

  focusInput(){
    this.addInputRef.current.focus()
  }

  handleChange(e){
    this.setState({ nextUser: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    e.stopPropagation();

    const workspace = { userEmails: this.state.emails }
    const modal = {
      name: 'workspace-users-invited',
    }

    this.props.inviteToWorkspace(this.props.workspace.id, workspace)
    this.props.hideModal();
    this.props.showModal(modal)
  }

  render(){
    return(
      <div className='modal dark-modal'>
        <div className='workspace-invite-modal-content'>
          <div className='workspace-invite-modal-header'>
            <div>Invite people to {this.props.workspace.name}</div>
            <GrClose className='workspace-invite-modal-close' onClick={this.props.hideModal}/>
          </div>
          <span>To:</span>
          <div className='message-composer-added-members-list blue-outline-input' onClick={this.focusInput}>
              {Object.values(this.state.emails).map((email, idx) => <WorkspaceInviteListItem key={idx} email={email} removeUser={() => this.removeUser(email)} />)}
              <input 
                ref={this.addInputRef} 
                className='add-people-workspace' 
                placeholder={Object.values(this.state.emails).length === 0 ? 'Enter an email of a Relay user' : '' }
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPressed}
                value={this.state.nextUser}/>
            </div>
          <div className='workspace-invite-button-container'>
            <button className={`btn workspace-invite-button ${Object.values(this.state.emails).length === 0 ? 'grey-btn-inactive' : 'green-btn'}`} onClick={this.handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkspaceInviteModal;