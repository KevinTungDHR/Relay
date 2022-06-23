import React from 'react';

class EditMessageItem extends React.Component {
  constructor(props){
    super(props);
    this.state = { body: props.message.body }
    this.updateText = this.updateText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputRef = React.createRef();
    this.focusInput = this.focusInput.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  updateText(e){
    this.setState({ body: e.target.value })
  }

  focusInput(){
    this.inputRef.current.focus();
  }

  enterPressed(e){
    if(e.keyCode == 13 && e.shiftKey == false){
      this.handleSubmit(e)
    }
  }

  handleSubmit(e){
    e.preventDefault()

    this.props.updateMessage(Object.assign({}, this.props.message, { body: this.state.body }))
    this.props.closeEditor();
  }

  render(){
    return(
      <div className='edit-message-item-container' onClick={this.focusInput}>
        <textarea onKeyDown={this.enterPressed} ref={this.inputRef} className='edit-message-item-input' value={this.state.body} onChange={this.updateText}></textarea>
        
        <div className='edit-message-item-button-container'>
          <button className='btn grey-secondary-button' onClick={this.props.closeEditor}>Cancel</button>
          <button className='btn green-btn' onClick={this.handleSubmit}>Save</button>
        </div>
      </div>
    )
  }

}

export default EditMessageItem