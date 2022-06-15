import React from 'react';
import { GrClose } from 'react-icons/gr';
import { CgLock } from 'react-icons/cg';
import { BsHash } from 'react-icons/bs';
import EditChannelDescriptionContainer from './edit_channel_description_container';
import EditChannelNameContainer from './edit_channel_name_container';
import ChannelDetailsUserItemContainer from './channel_details_user_item_container';
import { BiSearch } from 'react-icons/bi';
import { fetchSearchMembers } from '../../../util/search_util';
import { IoCloseCircle } from 'react-icons/io5';
class ChannelDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = { editModalOpen: false, modalName: null, tab: this.props.modal.tab, query: "", searchUsers: [] }
    this.hideNestedModal = this.hideNestedModal.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount(){
    this.props.fetchChannel(this.props.modal.channelId)
  }

  handleLeave(){
    const { channelId } = this.props.modal
    const channel = this.props.channels[channelId]
    this.hideNestedModal()
    this.props.hideModal()
    this.props.leaveChannel(channel.id)

    // This works for making sure that you go to an available channel 
    // if your currently at that channel when you leave. Need to refactor
    if (parseInt(this.props.channelId) === channelId){
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
      const workspaceId = this.props.match.params.workspaceId
      for (const key in this.props.channels){
        if (parseInt(key) !== channelId){
          const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
          this.props.history.push(newPath)
          break;
        }
      }
    }
  }

  handleDelete(){
    const { channelId } = this.props.modal
    const channel = this.props.channels[channelId]
    this.hideNestedModal()
    this.props.hideModal()
    this.props.deleteChannel(channel.id)

    // This works for making sure that you go to an available channel 
    // if your currently at that channel when you leave. Need to refactor
    if (parseInt(this.props.channelId) === channelId){
      const { fullPath, url } = this.props
      const regexp = new RegExp(url)
      const workspaceId = this.props.match.params.workspaceId
      for (const key in this.props.channels){
        if (parseInt(key) !== channelId){
          const newPath = fullPath.replace(regexp, `/client/${workspaceId}/C${key}`);
          this.props.history.push(newPath)
          break;
        }
      }
    }
  }

  editModalOpen(modalName){
    return () => {
      this.setState({editModalOpen: true, modalName: modalName})
    }
  }

  hideNestedModal(){
    this.setState({ editModalOpen: false, modalName: null })
  }

  renderEditModals(){
    if(!this.state.editModalOpen){
      return null
    }

    switch(this.state.modalName){
      case 'edit-description':
        return <EditChannelDescriptionContainer hideModal={this.hideNestedModal} />
      case 'edit-channel-name':
        return <EditChannelNameContainer hideModal={this.hideNestedModal} />
      default:
        return null;
    }
  }

  handleChange(e){
    const { workspaceId } = this.props.match.params
    this.setState({query: e.currentTarget.value}, () => {
      if(this.state.query !== ''){
        fetchSearchMembers(workspaceId, this.state.query)
        .then(({users}) => {
          this.setState({searchUsers: Object.values(users)});
        })
      } else {
        this.setState({ searchUsers: []})
      }
    })
  }

  changeTab(tabNum){
    return () => {
      this.setState({
        tab: tabNum
      })
    }
  }

  addUserToChannel(user, e){
    e.stopPropagation()
    const { channelId } = this.props.modal
    this.props.addMembers({ channelId: channelId, members: {[user.id]: user}, allMembers: false })
  }

  renderSearch(){
    const { users, subscriptions } = this.props
    const { channelId } = this.props.modal
    const channel = this.props.channels[parseInt(channelId)]
    const channelSubs = subscriptions.filter(sub => sub.subscribeableId === channel.id && sub.subscribeableType === "Channel")

    if(this.state.query === ''){
      return (
        <div className='channel-details-members-list'>
          {channelSubs.map((sub, idx) => <ChannelDetailsUserItemContainer key={idx} user={users[sub.userId]} userInChannel={true} />)}
        </div>
      )
    }

    const [inChannel, notInChannel] = this.state.searchUsers.reduce(([match, noMatch], user) => channelSubs.some((sub) => sub.userId === user.id) ? 
      [[...match, user], noMatch] : [match, [...noMatch, user]], 
      [[], []])

    return(
      <div className='channel-details-members-list'>
        <div className='channel-details-members-search-container'>
          {inChannel.length > 0 && 
          <div className='channel-details-inChannel-container'>
            <div className='channel-details-inChannel-header'>In this channel</div>
            {inChannel.map((user,idx) => <ChannelDetailsUserItemContainer key={idx} user={user} userInChannel={true}/>)}

          </div>}

          {notInChannel.length > 0 &&
          <div className='channel-details-notInChannel-container'>
            <div className='channel-details-notInChannel-header'>Not in Channel</div>
            {notInChannel.map((user,idx) => <ChannelDetailsUserItemContainer key={idx} user={user}  userInChannel={false} addUser={(e) => this.addUserToChannel(user, e)}/>)}
          </div>}
        
        </div>
      </div>
    )
  }

  render(){
    const { hideModal, users } = this.props
    const { tab } = this.state
    const { channelId } = this.props.modal
    const channel = this.props.channels[parseInt(channelId)]
    return(
      <div className={`dark-modal modal`}>
        <div className={tab === 1 ? 'channel-details-modal-content' : 'channel-details-modal-content  modal-bg-white'}>
          <header className='channel-details-modal-header'>
            <div className="channel-details-modal-title">
              <div className="channel-details-modal-name">
                {channel.public ? <BsHash /> : <CgLock />}
                <h2>{channel.name}</h2>
              </div>
              <div
                onClick={hideModal} 
                className='channel-details-close-container'>
                <GrClose className='channel-details-close-icon'/>
              </div>
            </div>

            <div className='channel-details-tabs'>
              <div onClick={this.changeTab(1)} className={`tab ${tab === 1 ? "active-tab" : "" }`}>About</div>
              <div onClick={this.changeTab(2)} className={`tab ${tab === 2 ? "active-tab" : "" }`}>Members</div>
            </div>
          </header>
          {this.state.tab === 1 &&
          <>
          <div className='channel-details-modal-body-container'>
                <div className='channel-details-modal-body'>
                  <div 
                    onClick={this.editModalOpen("edit-channel-name")}
                    className='channel-details-body-item channel-details-description'>
                    <div>
                      <h3>Channel name</h3>
                      <div>{channel.name}</div>
                    </div>
                    <div>
                      <button className='btn channel-details-body-edit'>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='channel-details-modal-body-container'>
                <div className='channel-details-modal-body'>
                  <div  
                    onClick={this.editModalOpen("edit-description")}
                    className='channel-details-body-item channel-details-description'>
                    <div>
                      <h3>Description</h3>
                      <div>{channel.description}</div>
                      <h3>Created By</h3>
                      <div>{users[channel.adminId].displayName}</div>
                    </div>
                  </div>
                  <div onClick={this.handleLeave} className='channel-details-body-item'>
                    <button 
                      className='btn channel-details-leave-channel '>
                      <h3>Leave Channel</h3>
                    </button>
                  </div>
                  <div onClick={this.handleDelete} className='channel-details-body-item'>
                    <button 
                      className='btn channel-details-leave-channel '>
                      <h3>DELETE Channel</h3>
                    </button>
                  </div>
                </div>
              </div>  
            </>
          }
          {this.state.tab === 2 &&
            <div className='channel-details-members-container'>
              <div className='channel-details-searchbar-container'>
                <div className='channel-details-searchbar blue-outline-input'>
                  <div className='channel-details-searchbar-icon-container'>
                    <BiSearch className='search-modal-search-icon'/>
                  </div>
                  <input className='channel-details-input ' 
                    type="text" 
                    placeholder='Find Members'
                    value={this.state.query}
                    onChange={this.handleChange} />
                  {this.state.query !== '' && 
                  <div className='channel-details-input-clear' onClick={() => this.setState({ query: ''})}>
                    <IoCloseCircle />
                  </div>}
                  {/* <div onClick={hideModal} className='search-modal-close-icon-container'>
                    <MdClose className='search-modal-close-icon'/>
                  </div> */}
                </div>
              </div>
              {this.renderSearch()}
            </div>
          }
        </div>
        {this.renderEditModals()}
      </div>
    )
  }
}

export default ChannelDetails;