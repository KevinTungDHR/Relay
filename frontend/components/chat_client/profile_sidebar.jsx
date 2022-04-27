import React from 'react';
import { GrClose } from "react-icons/gr";
import { BsImage,BsChatText } from "react-icons/bs";
import { BiCircle } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5"

class ProfileSidebar extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='c-profile-sidebar-container'>
        <header className='c-profile-sidebar-header'>
          <span>Profile</span>
          <GrClose/>
        </header>
        <div className='c-profile-sidebar-body'>
          <section className='c-profile-sidebar-details'> 
            <div className='c-profile-sidebar-picture'>
              <BsImage className='full-scale-icon'/>
            </div>
            <div>
              <span>Member Name</span>
              <BiCircle />
            </div>
            <div className='c-profile-actions'>
              <div className='c-profile-action'>
                <div>
                  <BsChatText />
                </div>
                <span>Message</span>
              </div>
              <div className='c-profile-action'>
                <div>
                  <IoEllipsisHorizontal />
                </div>
                <span>More</span>
              </div>
            </div>
            <section className='c-profile-fields'>
            <div className='c-profile-field'>
              <div>Display Name</div>
              <div>Member Name</div>
            </div>
            <div className='c-profile-field'>
              <div>Local Time</div>
              <div>Time</div>
            </div>
            </section>
          </section>
          
        </div>
      </div>
    )
  }
}

export default ProfileSidebar;