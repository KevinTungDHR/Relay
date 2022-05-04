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
        <div className='generic-modal-container'>
          <div>
            <h2>Edit Description</h2>
            <GrClose />
          </div>
          <textarea 
            value={this.state.description}
            onChange={this.updateDescription}
            cols="30" rows="10"></textarea>
          <div>
            <button className='btn'>Cancel</button>
            <button 
              onClick={this.handleSubmit}
              className='btn'>Save</button>
          </div>
        </div>
      </div>

    )
  }
}

export default EditChannelDescription;