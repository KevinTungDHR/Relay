import React from 'react';

const MenuIcon = ({toggleSideNav}) => {
  return (
    <div className='header-menu-icon' onClick={toggleSideNav}>
      <img src={window.images.barsSolid} alt="hamburger-menu"/>
    </div>
  )
}

export default MenuIcon