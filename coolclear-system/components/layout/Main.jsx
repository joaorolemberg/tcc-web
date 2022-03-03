/* eslint-disable react/prop-types */
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Auth.module.css';

function Main({ children }) {
  return (
    <div className={styles.mainBackground}>
      <Sidebar />
      {children}
    </div>

  );
}

export default Main;
