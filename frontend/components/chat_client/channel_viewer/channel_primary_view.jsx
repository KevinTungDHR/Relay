import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { FaUser } from "react-icons/fa"
import ChannelMessageItemContainer from './channel_message_item_container';

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      body: ""
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.updateForm = this.updateForm.bind(this);
    this.chatEndRef = React.createRef()
    this.enterPressed = this.enterPressed.bind(this);
  }

  updateForm(e){
    this.setState({
      body: e.target.value
    })
  }

  sendMessage(e){
    e.preventDefault()
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

  enterPressed(e){
    if(e.keyCode === 13){
      this.sendMessage(e)
    }
  }

  scrollChat(){
    this.chatEndRef.current.scrollIntoView()
    //{ behavior: "smooth" } took out because it's weird on the first load
  }

  showModal(name){
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

  renderHeader(){
    const { channel } = this.props
    if(channel){
      return (
        <>
          {channel.public ? 
            <BsHash className='channel-messages-header-hash-icon'/> : 
            <CgLock className='channel-messages-header-lock-icon'/>}
          <h2>{channel.name}</h2>
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
          <div className='channel-messages-header-title'>
            {this.renderHeader()}
          </div>
          <button 
            onClick={this.showModal('channel-details-modal')}
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
          <form className='message-text-editor' onSubmit={this.sendMessage}>
            <textarea className="text-area-message"value={this.state.body} onChange={this.updateForm} onKeyUp={this.enterPressed} ></textarea>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ChannelPrimaryView;