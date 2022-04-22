import React, { useState } from 'react';
import {
  NavbarBrand, NavbarToggler, Navbar, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';

// eslint-disable-next-line react/prop-types
export default function MainNavbar({ setSidebarOpen }) {
  const { user, logout } = useAuth();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  return (
    <Navbar
      color="faded"
      light
      style={{ backgroundColor: '#2E7D32', minWidth: '100%' }}
    >
      <NavbarToggler
        className="me-2"
        onClick={() => setSidebarOpen((currState) => !currState)}
      />
      <NavbarBrand
        href="/"
        style={{ color: 'white', fontSize: '25px', paddingRight: '60px' }}
        className="mx-auto"
      >
        CoolClear
      </NavbarBrand>
      <Dropdown
        isOpen={dropdownIsOpen}
        toggle={() => (setDropdownIsOpen((currState) => (!currState)))}
      >
        <DropdownToggle
          nav
          className="text-white bold"
        >
          {user.first_name ? user.first_name : ''}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Ações</DropdownItem>
          <DropdownItem onClick={() => logout()}>
            <i className="fas fa-sign-out" />
            {' '}
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
}
