import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    // Al cargar, intenta recuperar el usuario del sessionStorage
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUserAuth(JSON.parse(userData));
    }
  }, []);

  const login = (userData) => {
    setUserAuth(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUserAuth(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ userAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
