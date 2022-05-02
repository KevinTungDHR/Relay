import React from 'react';
import { BsHash } from 'react-icons/bs';
import { FaUser } from "react-icons/fa"

class SearchModalListItem extends React.Component {
  constructor(props){
    super(props)
  }

  renderContent(){
    const { channel, user } = this.props;

    if(channel){
      return(
        <div>
          {channel.name}
        </div>
      )
    }

    if(user){
      return(
        <div>
          {user.displayName}
        </div>
      )
    }
  }

  render(){
    return(
      <div className="search-result-item-container">
        {this.renderContent()}
      </div>
    )
  }
}

export default SearchModalListItem;