import React, { useState } from 'react';
import {
  Nav, NavItem, NavLink, NavbarBrand, NavbarToggler, Navbar, Collapse,
} from 'reactstrap';

function Sidebar() {
  const [status, setStatus] = useState(false);
  return (
    <div>
      <Navbar
        color="faded"
        light
      >
        <NavbarBrand
          className="me-auto"
          href="/"
        >
          reactstrap
        </NavbarBrand>
        <NavbarToggler
          className="me-2"
          onClick={() => setStatus((currState) => (!currState))}
        />
        <Collapse navbar isOpen={status}>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">
                Components
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Sidebar;
