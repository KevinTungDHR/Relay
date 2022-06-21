import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { FaUser } from "react-icons/fa"
import ChannelMessageItemContainer from './channel_message_item_container';
import { HiChevronDown } from 'react-icons/hi'

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      body: ""
    }

    this.sendMessage = this.sendMessage.bind(this)
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
    const { channel } = this.props
    this.props.createChannelMessage(channel.id, this.state)
    this.setState({ body: "" })
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
        <div className='client-channel-messages-container'>
          {messages.map((message, idx) => <ChannelMessageItemContainer key={idx} message={message}/>)}
          <div ref={this.chatEndRef} ></div>
        </div>
        <div className='text-editor-container'>
          <form className='message-text-editor' onSubmit={this.sendMessage} onClick={this.focusInput}>
            <input ref={this.inputRef} className="text-area-message"value={this.state.body} onChange={this.updateForm} />
            <button className={`btn send-message-button ${this.state.body === '' ? 'grey-btn-inactive' : 'green-btn'}`}>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ChannelPrimaryView;