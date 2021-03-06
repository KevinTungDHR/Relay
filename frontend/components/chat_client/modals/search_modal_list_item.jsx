import React from 'react';
import { BsHash } from 'react-icons/bs';
import { FaUser } from "react-icons/fa"

class SearchModalListItem extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);

    this.createNewDM = this.createNewDM.bind(this);
  }

  handleClick(){
    const { fullPath, url, channel } = this.props
    const regexp = new RegExp(url)

    this.props.hideModal()
    const newPath = fullPath.replace(regexp, `/client/${channel.workspaceId}/C${channel.id}`);
    
    if (this.props.history.location.pathname !== newPath) {
      this.props.history.push(newPath)
    }
  }

  // handleClickUser(){
  //   const { user } = this.props;
  //   const { pathname } = this.props.location
  //   this.props.hideModal()
  //   const cleanPath = pathname.split("/").slice(0,4).join("/")
  //   const newPath = `${cleanPath}/user_profile/${user.id}`
  //   if (this.props.history.location.pathname !== newPath) {
  //     this.props.history.push(newPath)
  //   }

  // }

  createNewDM(e){
    e.preventDefault();
  
    const directMessage = {
      userIds: [this.props.user.id],
      workspaceId: this.props.workspaceId,
    }

    this.props.createDirectMessage(directMessage, this.props.history.push);
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
        <div onClick={this.createNewDM} className="search-result-item-container">
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