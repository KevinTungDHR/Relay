import React from 'react';

class ComposerResultUser extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { user } = this.props;
    return(
      <div className='message-composer-channel-item' >
        <div>{user.displayName}</div>
      </div>
    )
  }
}

export default ComposerResultUser;