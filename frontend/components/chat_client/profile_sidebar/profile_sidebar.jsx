import React from 'react';
import { GrClose } from "react-icons/gr";
import { BsChatText } from "react-icons/bs";
import { BiCircle } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5"
import { FaUser } from "react-icons/fa"

class ProfileSidebar extends React.Component {
  constructor(props){
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.createNewDM = this.createNewDM.bind(this);
  }

  handleClose(){
    const { pathname } = this.props.location
    const cleanPath = pathname.split("/").slice(0,4).join("/")
    this.props.history.push(cleanPath)
  }

  componentDidMount(){
    this.props.showSecondary({ open: true, window: "profile"})
  }

  componentWillUnmount(){
    this.props.hideSecondary()
  }

  createNewDM(e){
    e.preventDefault();

    const directMessage = {
      userIds: [this.props.user.id],
      workspaceId: this.props.workspaceId,
    }

    this.props.createDirectMessage(directMessage, this.props.history.push);
  }

  render(){
    const { user } = this.props
    return(
          <div className='c-profile-sidebar-container'>
            <header className='c-profile-sidebar-header'>
              <span>Profile</span>
              <div className="c-profile-close-container" onClick={this.handleClose}>
                <GrClose/>
              </div>
            </header>
            <div className='c-profile-sidebar-body'>
              <section className='c-profile-sidebar-details'> 
                <div className='c-profile-sidebar-picture'>
                  <FaUser className='full-scale-icon'/>
                </div>
                {/* <div>
                  <span>{user.displayName}</span>
                  <BiCircle />
                </div> */}
                <div className='c-profile-actions'>
                
                  {/* <div className='c-profile-action'>
                    <div>
                      <IoEllipsisHorizontal />
                    </div>
                    <span>More</span>
                  </div> */}
                </div>
                <section className='c-profile-fields'>
                <div className='c-profile-field'>
                  <div className='c-profile-name'>{user.displayName}</div>
                </div>

                <div className='c-profile-action' onClick={this.createNewDM}>
                    <div>
                      <BsChatText />
                    </div>
                    <span>Message</span>
                  </div>
                {/* <div className='c-profile-field'>
                  <div>Local Time</div>
                  <div>Time</div>
                </div> */}
                </section>
              </section>
              
            </div>
          </div>

    )
  }
}

export default ProfileSidebar;