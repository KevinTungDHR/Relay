import React from 'react';
import ChannelPrimaryViewContainer from './channel_viewer/channel_primary_view_container';
import DirectMessagePrimaryViewContainer from './direct_message_primary_view_container';


class PrimaryView extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    debugger
    const pref = this.props.match.params.messageableId[0];
    switch(pref){
      case "C":
        return <ChannelPrimaryViewContainer />  
      case "D":
        return <DirectMessagePrimaryViewContainer />
      default:
        return <div>Error</div> 
    }
  
  }
}

export default PrimaryView;