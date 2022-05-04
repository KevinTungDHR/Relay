import React from 'react';
import { GrClose } from 'react-icons/gr';

class EditChannelName extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      name: props.channels[props.modal.channelId].name }
    this.updateName = this.updateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOffModalClick = this.handleOffModalClick.bind(this);
  }

  handleSubmit(e){
    e.preventDefault()
    const channel = this.props.channels[this.props.modal.channelId]
    this.props.updateChannel(Object.assign({}, channel, this.state ));
    this.props.hideModal()
  }

  updateName(e){
    this.setState({
      name: e.target.value
    })
  }

  handleOffModalClick(e){
    e.preventDefault
    if(e.target.classList.contains('super-modal')){
      this.props.hideModal()
    }
  }

  render(){
    return(
      <div onMouseDown={this.handleOffModalClick} className='super-modal dark-modal'>
        <div className='generic-modal-container edit-channel-description-container'>
          <header className='edit-channel-header'>
            <h2>Rename this channel</h2>
            <div 
              className='generic-close-icon-container'
              onClick={this.props.hideModal}>
              <GrClose className='generic-centered-icon'/> 
            </div>
          </header>
          <input 
            type="text" 
            className='blue-outline-input edit-channel-description-textarea'
            value={this.state.name}
            onChange={this.updateName}/>
          <div className='edit-channel-description-footer'>
            <div className='generic-edit-modal-button-container'>
              <button 
                onClick={this.props.hideModal}
                className='btn simple-btn smaller-btn'>Cancel</button>
              <button 
                onClick={this.handleSubmit}
                className='btn green-btn smaller-btn'>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditChannelName;