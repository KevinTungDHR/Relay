import React from 'react';
import { GrClose } from "react-icons/gr";
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';

class CreateChannelModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: "",
      description: "",
      public: true,
      nameError: false
    }

    this.handleChecked = this.handleChecked.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateName(e){
    this.setState({
      name: e.target.value
    }, () => {
      if(this.state.name === ""){
        this.setState({
          nameError: true
        })
      } else {
        this.setState({
          nameError: false
        })
      }
    })
  }

  handleChecked(){
    this.setState((state) => {
      return {public: !state.public}
    })
  }

  updateDescription(e){
    this.setState({
      description: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const { name } = this.state
    if (name === ""){
      return;
    }
    const { fullPath, url } = this.props
    const regexp = new RegExp(url)


    const { workspaceId } = this.props.match.params
    this.props.createChannel(Object.assign({}, this.state, { workspaceId: workspaceId }))
      .then(() => {
        const newPath = fullPath.replace(regexp, this.props.redirectLink);
        // this.props.hideModal();
        const modal = {
          name: 'add-members-to-channel',
          posX: 0,
          posY: 0,
          channelId: this.props.channelId
        }
        this.props.history.push(newPath)
        this.props.showModal(modal)
        }
      )


  }
  renderButton(){
    const { name } = this.state
    if (name === ""){
      return <button className='grey-btn-inactive submit-channel-button-inactive'>Create</button>
    } else {
      return <input className='btn submit-channel-button' type="submit" value="Create" />
    }
  }


  renderAccess() {
    if(this.state.public){
      return(
        <div className='input-icon-channel-access'>
          <BsHash /> 
        </div>
      )
    } else {
      return(
        <div className='input-icon-channel-access'>
           <CgLock className='small-channel-access-icon'/>
        </div>
      )
    }
  }

  render() {
    const { hideModal} = this.props
    return (
      <div className='dark-modal modal'>
        <div className='create-channel-modal-content'>
          <header className='create-channel-modal-header'>
            {this.state.public && <span>Create a channel</span>} 
            {!this.state.public && <span>Create a private channel</span>} 
            <div 
              onClick={hideModal}
              className='medium-icon channel-modal-close-container'>
              <GrClose className='channel-modal-close-button'/>
            </div>
          </header>
          <form onSubmit={this.handleSubmit} className='create-channel-modal-body'>
            <p>Channels are where your team communicates. 
              They’re best when organized around a topic — #marketing, for example.</p>
            <div className='create-channel-modal-input-container'>
              <label>Name {this.state.nameError && <span className='create-channel-input-error'>Don’t forget to name your channel.</span>}</label>
              {this.renderAccess()}
              <input 
                id="create-channel-modal-name" 
                className='form-input channel-form-input'  
                type="text" 
                placeholder='e.g. plan-budget'
                value={this.state.name} 
                onChange={this.updateName} />
            </div>
            <div className='create-channel-modal-input-container'>
              <label id="create-channel-modal-description" >Description <small>(optional)</small></label>
              <input 
                className='form-input' 
                type="text"
                value={this.state.description}
                onChange={this.updateDescription}  />
              <div>What’s this channel about?</div>
            </div>
            <div className='create-channel-modal-change-access-container'>
              <div className="create-channel-modal-access-copy">
                <h3>Make private</h3>
                {this.state.public && <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>}
                {!this.state.public && <p><strong>This can’t be undone.</strong> A private channel cannot be made public later on.</p>}
              </div>
                <input 
                  id='checked' 
                  type="checkbox" 
                  checked={!this.state.public} 
                  onChange={this.handleChecked}
                  className='toggle'/>
                <label htmlFor='checked'></label>
            </div>
            <div className='create-channel-button-container'>
              {this.renderButton()}
            </div>
          </form>
        </div>
      </div>
    )
  }
 
}

export default CreateChannelModal;