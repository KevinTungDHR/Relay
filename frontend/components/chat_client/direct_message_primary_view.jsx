import React from 'react';
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

  renderName(){
    const { directMessage, subscriptions, sessionId, users } = this.props

    const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)
    if (otherUsers.length === 1){
      return  <h2>{otherUsers.first.displayName}</h2>
    } else if (otherUsers.length == 2) {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      return  <h2>{names}</h2>
    } else {
      const names = otherUsers.slice(0,2).map(user => user.displayName).join(", ")
      const ending = otherUsers.length == 3 ? ` and ${otherUsers.length - 2} other` : ` and ${otherUsers.length - 2} others` 
      return  <h2>{names + ending}</h2>
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
    const { messages, directMessage } = this.props
    if (!directMessage){
      return null;
    }
    return(
      <div className='channel-messages-container'>
        <header className='channel-messages-header'>
          <div className='channel-messages-header-title'>
            {this.renderName()}
          </div>
          <button 
            onClick={this.showModal('channel-details-modal')}
            className='btn channel-messages-members-button-container'>
            <FaUser className='channel-messages-members-icon'/>
            <span>{directMessage.subscriptionIds.length}</span>
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