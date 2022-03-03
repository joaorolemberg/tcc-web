/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, useState } from 'react';

const initialStateAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const localData = parseCookies();
    return localData.isAuthenticated ? JSON.parse(localData.isAuthenticated) : false;
  }
  return null;
};

const AuthContext = createContext({});

export const AuthContextProvider = function b({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialStateAuthenticated());
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = (inputs) => {
    setIsAuthenticating(true);
    if (inputs.email !== 'joao@pedro') {
      setIsAuthenticating(false);
      return { login: false, text: 'email errado' };
    }
    setIsAuthenticated(true);
    setCookie(null, 'isAuthenticated', true, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setIsAuthenticating(false);
    return { login: true, text: 'ok' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    destroyCookie(null, 'isAuthenticated');
    Router.replace('/auth/login');
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, login, logout, isAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const AuthContextConsumer = AuthContext.Consumer;

export default AuthContext;
