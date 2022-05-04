import React from 'react';
import { GrClose } from 'react-icons/gr';

class AddPeopleOncreateModal extends React.Component {
  constructor(props){
    super(props)
    this.state = { addType: 'addAll', name: "", members: null }
    this.handleOffModalClick = this.handleOffModalClick.bind(this);
    window.state = this.state
    this.handleChange = this.handleChange.bind(this)
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

  renderButtons(){
    const { addType, members } = this.state
    if(addType === 'addAll'){
      return <button onClick={this.handleSubmit}
       className='btn green-btn smaller-btn'>Done</button>
    } else if(addType === 'addSpecific' && members == null){
      return <button className='btn simple-btn smaller-btn'>skip for now</button>
    } else {
      return <button className='btn green-btn smaller-btn'>Add</button>
    }
  }

  handleChange(e){
    this.setState({ addType: e.target.value })
  }

  render(){
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
            <input type="text" className='blue-outline-input add-people-input'/>
            <div className='added-members-list'>
              {this.state.members.map((member,idx) => <div key={idx}>{member.displayName}</div>)}
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