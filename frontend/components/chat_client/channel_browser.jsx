import React from 'react';
import ChannelBrowserItem from './channel_browser_item';
class ChannelBrowser extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchChannelsSearch()
  }

  renderChannels(){
    const { browserChannels } = this.props
    if (browserChannels){
      return(
        <div>
          {browserChannels.map((channel, idx) => {
            return <ChannelBrowserItem channel={channel} key={idx} />
          })}
        </div>
      )
    } else {
      return null;
    }
  }

  render(){
    return(
      <div>
        {this.renderChannels()}
      </div>
    )
  }
}

export default ChannelBrowser;