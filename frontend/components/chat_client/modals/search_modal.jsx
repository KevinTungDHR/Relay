import React from 'react';
import { BiSearch } from 'react-icons/bi'
import { MdClose } from "react-icons/md";
import SearchModalListItemContainer from './search_modal_list_item_container';

class SearchModal extends React.Component {
  constructor(props){
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps){
    const { workspaceId } = this.props.match.params

    if (prevProps.query !== this.props.query){
      if (this.props.query === "") {
        this.props.clearQuery();
        return;
      }
      this.props.fetchSearchQuery(workspaceId, this.props.query)
    }
  }

  handleChange(e){
    this.props.receiveQuery(e.currentTarget.value)
  }

  render(){
    const { queryChannels, queryUsers, query, modalOpen, hideModal, posY } = this.props;
    const modalClass = modalOpen ? 'modal' : 'hidden'
    return(
      <div className={modalClass}>
        <div className='search-modal-container' style={{left: "27%", top: posY }}>
          <header className='search-modal-searchbar'>
            <div className='search-modal-search-icon-container'>
              <BiSearch className='search-modal-search-icon'/>
            </div>
            <input className='search-modal-input' 
              type="text" 
              placeholder='Delve into your archives, seize upon the answers. Rejoice'
              value={query}
              onChange={this.handleChange} />
            <div onClick={hideModal} className='search-modal-close-icon-container'>
              <MdClose className='search-modal-close-icon'/>
            </div>
          </header>
          <div className="search-modal-results">
            {queryChannels.slice(0, 4).map((channel, idx) => <SearchModalListItemContainer key={idx} channel={channel}/>)}
            {queryUsers.slice(0, 4).map((user, idx) => <SearchModalListItemContainer key={idx} user={user}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchModal;