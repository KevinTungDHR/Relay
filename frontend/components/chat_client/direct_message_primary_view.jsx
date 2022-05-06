import React from 'react';
import { BsHash } from 'react-icons/bs';
import { CgLock } from 'react-icons/cg'
import { FaUser } from "react-icons/fa"
import ChannelMessageItemContainer from './channel_viewer/channel_message_item_container';

class DirectMessagePrimaryView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      body: ""
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.updateForm = this.updateForm.bind(this);
    this.chatEndRef = React.createRef()
  }

  updateForm(e){
    this.setState({
      body: e.target.value
    })
  }

  sendMessage(){
    const { channel } = this.props
    this.props.createChannelMessage(channel.id, this.state)
  }

  componentDidMount(){
    const { directMessageId } = this.props
    this.props.fetchDirectMessage(directMessageId)
      .then(() => this.scrollChat())
  }

  componentDidUpdate({
    directMessageId: prevdirectMessageId,
    messages: prevMessages
  }){
    const { directMessageId, messages } = this.props
    if(prevdirectMessageId !== directMessageId){
      this.props.fetchDirectMessage(directMessageId)
        .then(() => this.scrollChat())
    } else if (messages.length > prevMessages.length) {
      this.scrollChat()
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
        directMessageId: this.props.directMessageId,
        tab: 2
      }
      this.props.showModal(modal)
    }
  }

  render(){
    const { messages, dmSubs, directMessage } = this.props

    return(
      <div className='channel-messages-container'>
        <header className='channel-messages-header'>
          <div className='channel-messages-header-title'>
            <h2>{directMessage.name}</h2>
          </div>
          <button 
            onClick={this.showModal('channel-details-modal')}
            className='btn channel-messages-members-button-container'>
            <FaUser className='channel-messages-members-icon'/>
            <span>{dmSubs.length}</span>
          </button>
        </header>
        <div className='client-channel-messages-container'>
          {messages.map((message, idx) => <ChannelMessageItemContainer key={idx} message={message}/>)}
          <div ref={this.chatEndRef} ></div>
        </div>
        <div className='text-editor-container'>
          <input type="text" value={this.state.body} onChange={this.updateForm} />
            <button onClick={this.sendMessage}>Submit</button>
        </div>
      </div>
    )
  }
}

export default DirectMessagePrimaryView;