import React from 'react';
import HamburgerIcon from '../../../../app/assets/images/bars-solid.svg'

const MenuIcon = ({toggleSideNav}) => {
  return (
    <div className='header-menu-icon' onClick={toggleSideNav}>
      <HamburgerIcon viewBox="0 0 448 512"/>
    </div>
  )
}

export default MenuIcon