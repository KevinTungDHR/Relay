import React from 'react';

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div>
        Channel: {this.props.match.params.channelId}
      </div>
    )
  }
}

export default ChannelPrimaryView;