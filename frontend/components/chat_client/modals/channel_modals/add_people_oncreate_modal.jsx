import _ from 'lodash';
import React from 'react';
import { GrClose } from 'react-icons/gr';
import UserCardItem from '../user_card_item';
import AddPeopleSearchItem from './add_people_search_item';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
class AddPeopleOncreateModal extends React.Component {
  constructor(props){
    super(props)
    this.state = { addType: 'addAll', name: "", members: {} }
    this.handleOffModalClick = this.handleOffModalClick.bind(this);
    window.state = this.state
    this.handleChange = this.handleChange.bind(this)
    this.handleName = this.handleName.bind(this)
    this.addMember = this.addMember.bind(this);
    this.addSpecific = this.addSpecific.bind(this);
    this.addAll = this.addAll.bind(this);
    this.addInputRef = React.createRef()
    this.focusInput = this.focusInput.bind(this);
    this.removeMember = this.removeMember.bind(this);
  }

  addAll(){
    const { messageableId } = this.props.match.params
    const channelId = messageableId
    this.props.addMembers({ channelId: channelId, members: null, allMembers: true })
    this.props.hideModal()
  }

  handleOffModalClick(e){
    e.preventDefault
    if(e.target.classList.contains('super-modal')){
      this.props.hideModal()
    }
  }

  addSpecific(){
    const { messageableId } = this.props.match.params
    const channelId = messageableId
    this.props.addMembers({ channelId: channelId, members: this.state.members, allMembers: false })
    this.props.hideModal()
  }

  renderButtons(){
    const { addType, members } = this.state
    if(addType === 'addAll'){
      return <button onClick={this.addAll}
       className='btn green-btn smaller-btn'>Done</button>
    } else if(addType === 'addSpecific' && Object.values(members).length === 0){
      return <button 
        className='btn simple-btn smaller-btn'
        onClick={this.props.hideModal}
        >skip for now</button>
    } else {
      return <button onClick={this.addSpecific} className='btn green-btn smaller-btn'>Add</button>
    }
  }

  handleChange(type){
    this.setState({ addType: type })
  }

  handleName(e){
    const { workspaceId } = this.props.match.params
    this.setState({ name: e.currentTarget.value }, 
      () => {
        this.props.fetchSearchMembers(workspaceId, this.state.name)
      })
  }

  addMember(member){
    this.setState((state) => {
      return {
        members: Object.assign({}, state.members, { [member.id]: member }),
        name: ''
      }
    })
  }

  removeMember(member){
    this.setState((state)=> {
      const { [member.id]: _, ...rest } = state.members;
      return {
         members: rest
      }
    })
  }
  
  focusInput(){
    this.addInputRef.current.focus()
  }

  renderSearchInputAndUsers(){
    const { queryUsers } = this.props

    if(this.state.addType === 'addSpecific'){
      return(
        <>
          <div onClick={this.focusInput} className='blue-outline-input add-people-input'>
            <div className='added-members-list'>
              {Object.values(this.state.members).map((member,idx) => <UserCardItem key={idx} user={member} removeMember={() => this.removeMember(member)} />)}
              <input ref={this.addInputRef} className='add-people' onChange={e => this.handleName(e)} value={this.state.name}/>
            </div>
            {this.state.name !== "" && <div className="add-people-search-results">
              {queryUsers.slice(0, 5).map((user, idx) => <AddPeopleSearchItem user={user} key={idx} addMember={this.addMember} />)}
              {queryUsers.length === 0 && <div className='no-matches-found'>No matches found</div>}
            </div>}
          </div>
        </>
      )
    }
  }

  render(){
    const { users, workspaces, channels } = this.props
    const { workspaceId, messageableId } = this.props.match.params
    return(
      <div onMouseDown={this.handleOffModalClick} className='super-modal dark-modal'>
        <div className='add-people-modal-container add-people-channel-form'>
          <header className='edit-channel-header'>
            <div className='add-people-title-header'>
              <h2>Add people</h2>
              <div className='add-people-modal-sub-header'>
                <div>{channels[messageableId].public ? <BsHash /> : <CgLock className='add-people-subheader-lock'/>} </div>
                <div>{channels[messageableId].name}</div>
              </div>
            </div>
            <div 
              className='generic-close-icon-container'
              onClick={this.props.hideModal}>
              <GrClose className='generic-centered-icon'/> 
            </div>
          </header>
          <div className='add-people-input-container' >
              <label htmlFor='addAll' className='radio-label'>
              <input
                type="radio" 
                value='addAll'
                id='addAll'
                checked={this.state.addType === 'addAll'}
                onChange={() => this.handleChange('addAll')}
                />
             {`Add all ${workspaces[workspaceId].subscriptionIds.length} members of `}<strong>{workspaces[workspaceId].name}</strong>
             </label>
             <label className='radio-label'>
              <input 
                name="addType" 
                type="radio" 
                value='addSpecific'
                id='addSpecific'
                checked={this.state.addType === 'addSpecific'}
                onChange={() => this.handleChange('addSpecific')}
                />
                <span className="checkmark"></span>
              Add specific people
              </label>
           {this.renderSearchInputAndUsers()}
          </div>
          <div className='edit-channel-description-footer'>
            <div className='generic-edit-modal-button-container'>
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddPeopleOncreateModal;