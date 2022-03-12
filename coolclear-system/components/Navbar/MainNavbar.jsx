import React from 'react';
import {
  NavbarBrand, NavbarToggler, Navbar,
} from 'reactstrap';
// eslint-disable-next-line react/prop-types
export default function MainNavbar({ setSidebarOpen }) {
  return (
    <Navbar
      color="faded"
      light
      style={{ backgroundColor: '#2E7D32', minWidth: '100%' }}
    >
      <NavbarToggler
        className="me-2"
        onClick={() => setSidebarOpen((currState) => (!currState))}
      />
      <NavbarBrand
        href="/"
        style={{ color: 'white', fontSize: '25px', paddingRight:'60px' }}
        className="mx-auto"
      >
        CoolClear
      </NavbarBrand>
    </Navbar>
  );
}
