import React from 'react';
import { GrClose } from 'react-icons/gr';
class EditChannelDescription extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      description: props.channels[props.modal.channelId].description }
    this.updateDescription = this.updateDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOffModalClick = this.handleOffModalClick.bind(this);
  }

  handleSubmit(e){
    e.preventDefault()
    const channel = this.props.channels[this.props.modal.channelId]
    this.props.updateChannel(Object.assign({}, channel, this.state ));
    this.props.hideModal()
  }

  updateDescription(e){
    this.setState({
      description: e.target.value
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
            <h2>Edit Description</h2>
            <div 
              className='generic-close-icon-container'
              onClick={this.props.hideModal}>
              <GrClose className='generic-centered-icon'/> 
            </div>
          </header>
          <textarea 
            className='blue-outline-input edit-channel-description-textarea'
            value={this.state.description}
            onChange={this.updateDescription}
            cols="15" rows="8"></textarea>
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

export default EditChannelDescription;