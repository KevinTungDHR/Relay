import React from 'react';

class ChannelPrimaryView extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount(){
    const { channelId } = this.props.match.params
    this.props.fetchChannel(channelId)
  }

  componentDidUpdate(prevProps){
    const { channelId } = this.props.match.params
    if(prevProps.match.params.channelId !== channelId){
      this.props.fetchChannel(channelId)
    }
  }

  render(){
    const { messages } = this.props
    return(
      <div>
        Channel: {this.props.match.params.channelId}
        {messages.map((message, idx) => <div key={idx}>{message.body}</div>)}
      </div>
    )
  }
}

export default ChannelPrimaryView;