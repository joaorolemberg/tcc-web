import React, { useState } from 'react';
import {
  Nav, NavItem, NavLink, Collapse,
} from 'reactstrap';
import routesAdmin from '../../routes';
import styles from './Sidebar.module.css';

// eslint-disable-next-line react/prop-types
function Sidebar({ sidebarOpen }) {
  // eslint-disable-next-line no-unused-vars
  const [routes, setRoutes] = useState(routesAdmin('adm'));
  return (
    <div>

      <Collapse horizontal isOpen={sidebarOpen} className={styles.collapse}>
        <Nav navbar>
          {routes.map((route) => (
            <NavItem key={route.path} className={styles.navItem}>
              <NavLink className={styles.navLink} href={route.path}>
                <span>
                  {' '}
                  <i className={route.icon} style={{ marginRight: '8px' }} />
                  {' '}
                </span>
                {route.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </div>
  );
}

export default Sidebar;
