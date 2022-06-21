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
    this.enterPressed = this.enterPressed.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.inputRef = React.createRef();
    this.handleHeaderClicked = this.handleHeaderClicked.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  handleHeaderClicked(){
    const { directMessage, sessionId, users, subscriptions } = this.props

    if(directMessage.subscriptionIds.length > 2){
      this.showModal('direct-messages-details-modal')()
      return;
    } else {
      const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)

      const { pathname } = this.props.location

      const cleanPath = pathname.split("/").slice(0,4).join("/")
      const newPath = `${cleanPath}/user_profile/${otherUsers[0].id}`
      if (this.props.history.location.pathname !== newPath) {
        this.props.history.push(newPath)
      }
    }
  }

  updateForm(e){
    this.setState({
      body: e.target.value
    })
  }

  enterPressed(e){
    if(e.keyCode === 13){
      this.sendMessage(e)
    }
  }
 
  sendMessage(e){
    e.preventDefault()
    const { directMessage } = this.props
    this.props.createDMMessage(directMessage.id, this.state)
    this.setState({ body: "" })
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
      return  <h2>{otherUsers[0].displayName}</h2>
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

  focusInput(){
    this.inputRef.current.focus()
  }

  renderDetailsIcon(){
    const { directMessage } = this.props

    if(directMessage.subscriptionIds.length == 2){
      return null;
    }
    return(
      <button 
        onClick={this.showModal('direct-messages-details-modal')}
        className='btn channel-messages-members-button-container'>
        <FaUser className='channel-messages-members-icon'/>
        <span>{directMessage.subscriptionIds.length}</span>
      </button>
    )
  }

  render(){
    const { messages, directMessage } = this.props
    if (!directMessage){
      return null;
    }
    return(
      <div className='channel-messages-container'>
        <header className='channel-messages-header'>
          <div className='channel-messages-header-title'
            onClick={this.handleHeaderClicked}>
            {this.renderName()}
          </div>
         {this.renderDetailsIcon()}
        </header>
        <div className='client-channel-messages-container'>
          {messages.map((message, idx) => <ChannelMessageItemContainer key={idx} message={message}/>)}
        <div ref={this.chatEndRef} ></div>
        </div>
        <div className='text-editor-container'>
          <form className='message-text-editor' onSubmit={this.sendMessage} onClick={this.focusInput}>
            <input ref={this.inputRef}  className="text-area-message"value={this.state.body} onChange={this.updateForm} onKeyUp={this.enterPressed} />
            <button className={`btn send-message-button ${this.state.body === '' ? 'grey-btn-inactive' : 'green-btn'}`}>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default DirectMessagePrimaryView;