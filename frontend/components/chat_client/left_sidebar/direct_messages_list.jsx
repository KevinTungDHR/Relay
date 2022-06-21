import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import DirectMessageItemContainer from './direct_message_item_container';

class DirectMessageList extends React.Component {
  constructor(props){
    super(props)

    this.state = { isHidden: false }
    this.toggleList = this.toggleList.bind(this);
    this.viewAllDms = this.viewAllDms.bind(this);
  }

  viewAllDms(e){
    e.preventDefault()

    const { fullPath, url } = this.props
    const { workspaceId } = this.props.match.params 

    const regexp = new RegExp(url)
    const newPath = fullPath.replace(regexp, `/client/${workspaceId}/all-dms`);
    this.props.history.push(newPath)
  }

  toggleList(){
    this.setState((state) => {
      return ({ isHidden: !state.isHidden })
    })
  }
  
  showModal(name){
    return e => {
      const { right, bottom } = e.currentTarget.getBoundingClientRect()
      const modal = {
        name: name,
        posX: right,
        posY: bottom
      }
      this.props.showModal(modal);
    }
  }

  render(){
    const { directMessages } = this.props;
    const caretClass = this.state.isHidden ? 'rotate-caret-sideways' : 'caret-down'
    return(
      <div className='channels-list-container'>
        <header className='channels-sidebar-heading'>
          <div 
            onClick={this.toggleList} 
            className='channels-header-sml-icon'>
              <FaCaretDown className={caretClass}/>
          </div>
          <span className='channels-sidebar-heading-label' onClick={this.toggleList}>Direct Messages</span>
          <section className='channels-sidebar-heading-buttons'>
            <div 
              className='channels-header-sml-icon channels-header-add'
              onClick={this.viewAllDms}>
              <BiPlus className='channel-header-add-icon'/>
            </div>
          </section>
        </header>
        <div className='channels-list-index'>
          {directMessages && directMessages.map((directMessage,idx) => 
          <DirectMessageItemContainer 
            directMessage={directMessage} 
            key={idx} 
            isHidden={this.state.isHidden}
            />)}
          <div className='channel-list-item' onClick={this.viewAllDms}>
            <div className='channel-footer-add-icon-container'>
              <BiPlus className='channel-footer-add-icon'/>
            </div>
            <span className='channel-list-item-text no-wrap-ellipsis'>Add Teammates</span>
          </div>
        </div>
      </div>
    )
  }
}

export default DirectMessageList;