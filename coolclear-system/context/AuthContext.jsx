/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, useState } from 'react';
import { loginAPI, meRoute } from '../service/API/account';

const initialStateAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const localData = parseCookies();
    return localData.isAuthenticated ? JSON.parse(localData.isAuthenticated) : false;
  }
  return null;
};
const initalStateToken = () => {
  if (typeof window !== 'undefined') {
    const localData = parseCookies();
    return localData.coolClearToken ? localData.coolClearToken : 'NOTLOGGED';
  }
  return null;
};
const initialStateUser = () => {
  if (typeof window !== 'undefined') {
    const localData = parseCookies();
    return localData.userCoolClear ? JSON.parse(localData.userCoolClear) : {};
  }
  return null;
};

const AuthContext = createContext({});

export const AuthContextProvider = function b({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialStateAuthenticated());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [coolClearToken, setCoolClearToken] = useState(initalStateToken());
  const [user, setUser] = useState(initialStateUser());

  const saveToken = (name, token, parse) => {
    if (parse) {
      setCookie(null, name, JSON.stringify(token), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } else {
      setCookie(null, name, token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  };

  const login = async (inputs) => {
    setIsAuthenticating(true);
    const response = await loginAPI(inputs);

    if (response.status === 200) {
      const { token } = response.data;
      const response2 = await meRoute({ token });
      if (response2.status === 200) {
        saveToken('coolClearToken', response.data.token);
        setCoolClearToken(response.data.token);
        setUser(response2.data);
        saveToken('userCoolClear', response2.data, true);
        setIsAuthenticating(false);
        return { login: true, text: 'Login realizado com sucesso!' };
      }
    }
    setIsAuthenticating(false);

    return { login: false, text: 'Não foi possível realizar o login, tente novamente' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    destroyCookie(null, 'isAuthenticated');
    Router.replace('/auth/login');
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, login, logout, isAuthenticating, coolClearToken, user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const AuthContextConsumer = AuthContext.Consumer;

export default AuthContext;
