import React from 'react';
import { GrClose } from 'react-icons/gr';

class MembershipAlertModal extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='modal dark-modal'>
        <div className='membership-alert-modal'>
          <div className='membership-alert-modal-header'>
            <h1>Membership is required in {this.props.channelName}</h1>
            <GrClose className='membership-alert-close-button' onClick={this.props.hideModal}/>
          </div>
          <p className='membership-alert-body'>Every workspace has one channel that contains all the members of this workspace — this is that channel for you.
          </p>
          <div className='membership-alert-btn-container'>
            <button onClick={this.props.hideModal} className='green-btn btn'>OK</button>
          </div>
        </div>
      </div>
    )
  }
}

export default MembershipAlertModal;