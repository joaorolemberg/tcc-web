/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

// const initialStateChat = () => {
//   if (typeof window !== 'undefined') {
//     const localData = parseCookies();
//     return localData.selectedChat ? JSON.parse(localData.selectedChat) : null;
//   }
//   return null;
// };
const AuthContext = createContext({});

export const AuthContextProvider = function b({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const AuthContextConsumer = AuthContext.Consumer;

export default AuthContext;
