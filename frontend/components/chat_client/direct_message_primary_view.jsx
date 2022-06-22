import React from 'react';
import { FaUser } from "react-icons/fa";
import { GrClose } from 'react-icons/gr';
import ChannelMessageItemContainer from './channel_viewer/channel_message_item_container';

class DirectMessagePrimaryView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      body: "",
      errors: ''
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.updateForm = this.updateForm.bind(this);
    this.chatEndRef = React.createRef()
    this.inputRef = React.createRef();
    this.focusInput = this.focusInput.bind(this);
    this.handleHeaderClicked = this.handleHeaderClicked.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  handleHeaderClicked(){
    const { directMessage, sessionId, users, subscriptions } = this.props

    if(directMessage.subscriptionIds.length > 2){
      this.showModal('direct-messages-details-modal')()
      return;
    } else if (directMessage.subscriptionIds.length === 2){
      const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)

      const { pathname } = this.props.location

      const cleanPath = pathname.split("/").slice(0,4).join("/")
      const newPath = `${cleanPath}/user_profile/${otherUsers[0].id}`
      if (this.props.history.location.pathname !== newPath) {
        this.props.history.push(newPath)
      }
    } else {
      const { pathname } = this.props.location

      const cleanPath = pathname.split("/").slice(0,4).join("/")
      const newPath = `${cleanPath}/user_profile/${sessionId}`
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
 
  sendMessage(e){
    e.preventDefault()
    if(this.state.body === ''){
      return;
    }

    if(this.state.body.length > 3000){
      this.setState({ errors: 'Message is over the character limit. Please break it up into multiple messages.'})
      return;
    }
    const { directMessage } = this.props
    this.props.createDMMessage(directMessage.id, { body: this.state.body })
    this.setState({ body: "", errors: '' })
  }


  componentDidMount(){
    const { directMessageId } = this.props
    this.props.fetchDirectMessage(directMessageId)
      .then(() => this.scrollChat())

    this.focusInput()
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
    if (!directMessage){
      return null;
    }
    const otherUsers = directMessage.subscriptionIds
        .map(id => users[subscriptions[id].userId])
        .filter(user => user.id != sessionId)
    if (otherUsers.length === 0) {
      return  <h2>{users[sessionId].displayName}</h2>
    } else if (otherUsers.length === 1){
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
    if (!directMessage){
      return null;
    }
    if(directMessage.subscriptionIds.length < 2){
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
    const { messages } = this.props
 
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
          {this.state.errors !== '' &&
          <div className='message-text-errors'>
              <div>{this.state.errors}</div>
              <GrClose className='message-text-errors-close' onClick={() => this.setState({ errors: ''})}/>
          </div>}
          <form className='message-text-editor' onSubmit={this.sendMessage} onClick={this.focusInput}>
            <input ref={this.inputRef}  className="text-area-message"value={this.state.body} onChange={this.updateForm} />
            <button className={`btn send-message-button ${this.state.body === '' ? 'grey-btn-inactive' : 'green-btn'}`}>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default DirectMessagePrimaryView;