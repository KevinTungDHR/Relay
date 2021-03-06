import React from 'react';
import { FaUser } from 'react-icons/fa';

class ChannelDetailsUserItem extends React.Component {
  constructor(props){
    super(props)
    this.openProfile = this.openProfile.bind(this);
  }

  openProfile(){
    const { user } = this.props;
    const { pathname } = this.props.location
    this.props.hideModal()
    const cleanPath = pathname.split("/").slice(0,4).join("/")
    const newPath = `${cleanPath}/user_profile/${user.id}`
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath)
    }
  }

  render(){
    const { user, userInChannel } = this.props
    return (
      <div onClick={this.openProfile} className='channel-details-user-item-container'>
        <div className='details-member-profile-icon-container'>
          <FaUser className='details-member-profile-icon'/>
        </div>
        <div className='details-member-user-item-displayname'>
          <div>{user.displayName}</div>
        </div>
        {!userInChannel && <div onClick={this.props.addUser} className='channel-details-user-item-add'>add</div>}
      </div>
    )
  }
}

export default ChannelDetailsUserItem