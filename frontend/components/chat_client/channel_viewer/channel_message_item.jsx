import React from 'react';
import { FaUser } from "react-icons/fa"
import EditMessageItemContainer from './edit_message_item_container';

class ChannelMessageItem extends React.Component {
  constructor(props){
    super(props)

    this.state = { hover: false, msgEditOpen: false }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    const { message, users } = this.props

    const user = users[message.authorId]
    const { pathname } = this.props.location

    const cleanPath = pathname.split("/").slice(0,4).join("/")
    const newPath = `${cleanPath}/user_profile/${user.id}`
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath)
    }
  }

  render(){
    const { message, users } = this.props
    let date = new Date(message.createdAt);
    const options =  { hour: 'numeric', minute: 'numeric', hour12: true }
    return(
      <div className='channel-msg-item-container' onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })}>
        <div className="channel-msg-item-profile">
          <FaUser className="channel-msg-profile-icon"/>
        </div>
        <div className='channel-msg-content'>
          <div className='channel-msg-header'>
            <div className='channel-msg-header-left'>
              <span className='channel-msg-author' onClick={this.handleClick}>{users[message.authorId].displayName}</span>
              <span className='channel-msg-time'>{date.toLocaleString('en-us', options)}</span>
              <span className='channel-msg-time'>{message.createdAt !== message.updatedAt && '(edited)'}</span>
            </div>
            {this.state.hover && <div className='channel-msg-header-right'>
              <span className='channel-msg-edit-button' onClick={() => this.setState({msgEditOpen: true })}>Edit</span>
            </div>}
          </div>
         
          <section className='channel-msg-body'>
          {this.state.msgEditOpen ? <EditMessageItemContainer message={message} closeEditor={() => this.setState({ msgEditOpen: false })}/> : message.body}
          </section>
        </div>
        
      </div>
    )
  }
}

export default ChannelMessageItem;