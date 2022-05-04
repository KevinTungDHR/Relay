import React from 'react';
import { GrClose } from 'react-icons/gr';
import AddPeopleSearchItem from './add_people_search_item';

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
  }

  // handleSubmit(e){
  //   e.preventDefault()
  //   const channel = this.props.channels[this.props.modal.channelId]
  //   this.props.updateChannel(Object.assign({}, channel, this.state ));
  //   this.props.hideModal()
  // }

  handleOffModalClick(e){
    e.preventDefault
    if(e.target.classList.contains('super-modal')){
      this.props.hideModal()
    }
  }

  addSpecific(){
    const { channelId } = this.props.match.params
    this.props.addMembers(channelId, this.state.members)
    this.props.hideModal()
  }

  renderButtons(){
    const { addType, members } = this.state
    if(addType === 'addAll'){
      return <button onClick={this.handleSubmit}
       className='btn green-btn smaller-btn'>Done</button>
    } else if(addType === 'addSpecific' && Object.values(members).length === 0){
      return <button className='btn simple-btn smaller-btn'>skip for now</button>
    } else {
      return <button onClick={this.addSpecific} className='btn green-btn smaller-btn'>Add</button>
    }
  }

  handleChange(e){
    this.setState({ addType: e.target.value })
  }

  handleName(e){
    const { workspaceId } = this.props.match.params
    this.setState({ name: e.target.value }, 
      () => {
        this.props.fetchSearchMembers(workspaceId, this.state.name)
      })
  }

  addMember(member){
    this.setState((state) => {
      return {
        members: Object.assign({}, state.members, { [member.id]: member })
      }
    })
  }

  render(){
    const { queryUsers } = this.props
    return(
      <div onMouseDown={this.handleOffModalClick} className='super-modal dark-modal'>
        <div className='generic-modal-container add-people-channel-form'>
          <header className='edit-channel-header'>
            <h2>Add people</h2>
            <div 
              className='generic-close-icon-container'
              onClick={this.props.hideModal}>
              <GrClose className='generic-centered-icon'/> 
            </div>
          </header>
          <div className='add-people-input-container'>
            <div className="input-radio-container" >
              <input 
                name="addType" 
                type="radio" 
                value='addAll'
                checked={this.state.addType === 'addAll'}
                onChange={this.handleChange}/>
              <label htmlFor="addType" className="container">Add all members</label>
            </div>
            <div className="input-radio-container" >
              <input 
                name="addType" 
                type="radio" 
                value='addSpecific'
                checked={this.state.addType === 'addSpecific'}
                onChange={this.handleChange}/>
                <span className="checkmark"></span>
              <label htmlFor="addType" className="container">Add specific people</label>
            </div>
            <div>
              <input type="text" className='blue-outline-input add-people-input' onChange={this.handleName}/>
              <div className="add-people-search-results">
                {this.state.name !== "" && queryUsers.slice(0, 5).map((user, idx) => <AddPeopleSearchItem user={user} key={idx} addMember={this.addMember}/>)}
              </div>
            </div>
            <div className='added-members-list'>
              {Object.values(this.state.members).map((member,idx) => <div key={idx}>{member.displayName}</div>)}
            </div>
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