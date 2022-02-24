import Router from 'next/router';
import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function index() {
  const { setIsAuthenticated } = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          setIsAuthenticated(true);
          Router.push('/');
        }}
        type="button"
      >
        Login
      </button>
    </div>

  );
}
