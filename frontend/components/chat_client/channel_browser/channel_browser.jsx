import React from 'react';
import { BiSearch } from 'react-icons/bi'
import ChannelBrowserItemContainer from './channel_browser_item_container';


class ChannelBrowser extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchBrowserChannels()
  }

  renderChannels(){
    const { browserChannels } = this.props
    if (browserChannels){
      return(
        <div className='channels-browser-list-container'>
          {browserChannels.map((channel, idx) => {
            return <ChannelBrowserItemContainer channel={channel} key={idx} />
          })}
        </div>
      )
    } else {
      return null;
    }
  }

  showModal(name){
    const modal = {
      name: name,
      posX: 0,
      posY: 0
    }
    return () =>{
      this.props.showModal(modal)
    }
  }

  render(){
    return(
      <div className='channel-browser-container'>
        <header className='channel-browser-header'>
          <div className='channel-browser-header-items'>
            <h1 className='channel-browser-header-title'>Channel browser</h1>
            <button className='btn simple-btn small-btn channel-browser-header-button'
              onClick={this.showModal('create-channel-modal')}>Create Channel</button>
          </div>
        </header>
        <div className='channel-browser-search-container'>
          <div className='channel-browser-search-icon'>
            <BiSearch />
          </div>
          <input className='blue-outline-input' type="text" placeholder='Search by channel name or description' />
        </div>
        {this.renderChannels()}
      </div>
    )
  }
}

export default ChannelBrowser;