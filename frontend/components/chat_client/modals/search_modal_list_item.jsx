import React from 'react';
import { BsHash } from 'react-icons/bs';
import { FaUser } from "react-icons/fa"

class SearchModalListItem extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);

  }

  handleClick(){
    const { channel } = this.props;
    
    if (channel){
      this.props.hideModal()
      this.props.history.push(`/client/${channel.workspaceId}/${channel.id}`)
    }
  }


  handleClickUser(){
    const { user } = this.props;
    const { pathname } = this.props.location
    this.props.hideModal()
    const cleanPath = pathname.split("/").slice(0,4).join("/")
    this.props.history.push(`${cleanPath}/user_profile/${user.id}`)
  }

  render(){
    const { channel, user } = this.props;

    if(channel){
      return(
        <div onClick={this.handleClick} className="search-result-item-container">
          <div className='search-result-hash-icon-container'>
            <BsHash className='search-result-hash-icon'/>
          </div>
          <div>{channel.name}</div>
        </div>
      )
    }

    if(user){
      return(
        <div onClick={this.handleClickUser} className="search-result-item-container">
          <div className='search-result-profile-icon'>
            <FaUser />
          </div>
          <div>{user.displayName}</div>
        </div>
      )
    }
  }
}

export default SearchModalListItem;