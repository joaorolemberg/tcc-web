/* eslint-disable react/prop-types */
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Middleware = function a({ children }) {
  const { coolClearToken } = useAuth();
  const { pathname } = useRouter();
  const [permission, setPermission] = useState(false);
  useEffect(() => {
    if (coolClearToken) {
      if (coolClearToken === 'NOTLOGGED') {
        if (pathname) {
          if (pathname.indexOf('auth') > -1) {
            setPermission(true);
          } else {
            router.replace('/auth/login');
          }
        }
      } else {
        setPermission(true);
      }
    }
    if (pathname) {
      if (pathname.indexOf('auth') > -1) {
        setPermission(true);
      }
    }
  }, [coolClearToken, pathname]);

  if (permission === true) {
    return (
      <div>
        {children}
      </div>
    );
  }
  return <div />;
};

export default Middleware;
