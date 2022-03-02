/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from 'reactstrap';
import styles from './Auth.module.css';

function Auth({ children }) {
  return (
    <div className={styles.mainBackground}>
      <div className={styles.header} />
      <div style={{ position: 'relative', top: '-100px' }}>
        {children}
      </div>
    </div>

  );
}

export default Auth;
