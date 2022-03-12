/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, Container } from 'reactstrap';
import CustomBread from '../Breadcrumb/CustomBread';
import MainNavbar from '../Navbar/MainNavbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Main.module.css';

function Main({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.mainBackground}>
      <MainNavbar setSidebarOpen={setSidebarOpen} />
      <div style={{ display: 'flex', flexDirection: 'row', minWidth: '100vw' }}>
        <Sidebar sidebarOpen={sidebarOpen} />
        <Container style={{ maxWidth: '100vw' }}>
          <CustomBread />
          {children}

        </Container>

      </div>

    </div>

  );
}

export default Main;
