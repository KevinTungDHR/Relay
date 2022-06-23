import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg';
import { FaUser } from "react-icons/fa";
import { GrClose } from 'react-icons/gr';
import ChannelMessageItemContainer from './channel_message_item_container';
import { HiChevronDown } from 'react-icons/hi'

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      body: "",
      errors: ""
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.chatEndRef = React.createRef()
    this.focusInput = this.focusInput.bind(this);
    this.inputRef = React.createRef();
  }

  focusInput(){
    this.inputRef.current.focus();
  }

  updateForm(e){
    this.setState({
      body: e.target.value
    })
  }

  sendMessage(e){
    e.preventDefault()
    if(this.state.body === ''){
      return;
    }
    if(this.state.body.length > 3000){
      this.setState({ errors: 'Message is over the character limit. Please break it up into multiple messages.'})
      return;
    }

    const { channel } = this.props
    this.props.createChannelMessage(channel.id, { body: this.state.body })
    this.setState({ body: "", errors: '' })
  }

  componentDidMount(){
    const { channelId } = this.props
    this.props.fetchChannel(channelId)
      .then(() => this.scrollChat())
  }

  componentDidUpdate({
    channelId: prevChannelId,
    messages: prevMessages
  }){
    const { channelId, messages } = this.props
    if(prevChannelId !== channelId){
      this.props.fetchChannel(channelId)
        .then(() => this.scrollChat())
    } else if (messages.length > prevMessages.length) {
      this.scrollChat()
    }
  }

  scrollChat(){
    this.chatEndRef.current.scrollIntoView()
    //{ behavior: "smooth" } took out because it's weird on the first load
  }

  showMembersModal(name){
    return () =>{
      const modal = {
        name: name,
        posX: 0,
        posY: 0,
        channelId: this.props.channelId,
        tab: 2
      }
      this.props.showModal(modal)
    }
  }

  showAboutModal(name){
    return () =>{
      const modal = {
        name: name,
        posX: 0,
        posY: 0,
        channelId: this.props.channelId,
        tab: 1
      }
      this.props.showModal(modal)
    }
  }

  enterPressed(e){
    if(e.keyCode == 13 && e.shiftKey == false){
      this.sendMessage(e)
    }
  }
  

  renderHeader(){
    const { channel } = this.props
    if(channel){
      return (
        <>
          {channel.public ? 
            <BsHash className='channel-messages-header-hash-icon'/> : 
            <CgLock className='channel-messages-header-lock-icon'/>}
          <h2>{channel.name}</h2>
          <HiChevronDown />
        </>
      )
    } else {
      return <div>...</div>
    }
  }

  render(){
    const { messages, channelSubs } = this.props

    return(
      <div className='channel-messages-container'>
        <header className='channel-messages-header'>
          <div className='channel-messages-header-title' onClick={this.showAboutModal('channel-details-modal')}>
            {this.renderHeader()}
          </div>
          <button 
            onClick={this.showMembersModal('channel-details-modal')}
            className='btn channel-messages-members-button-container'>
            <FaUser className='channel-messages-members-icon'/>
            <span>{channelSubs.length}</span>
          </button>
        </header>
        <div className='client-channel-messages-outer'>
          <div className='client-channel-messages-container'>
            {messages.map((message, idx) => <ChannelMessageItemContainer key={idx} message={message}/>)}
              <div ref={this.chatEndRef} ></div>
          </div>
        </div>
        <div className='text-editor-container'>
        {this.state.errors !== '' &&
          <div className='message-text-errors'>
              <div>{this.state.errors}</div>
              <GrClose className='message-text-errors-close' onClick={() => this.setState({ errors: ''})}/>
          </div>}
          <div className='message-text-editor' onClick={this.focusInput}>
            <textarea onKeyDown={this.enterPressed} ref={this.inputRef} className="text-area-message"value={this.state.body} onChange={this.updateForm}></textarea>
            <button onClick={this.sendMessage} className={`btn send-message-button ${this.state.body === '' ? 'grey-btn-inactive' : 'green-btn'}`}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelPrimaryView;