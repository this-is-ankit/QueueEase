import React, { createContext, useState, useEffect } from 'react';
import { getToken, getUserData, setToken, setUserData, removeToken, removeUserData } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved token and user data when the app loads
    const loadAuthData = async () => {
      try {
        const savedToken = await getToken();
        const savedUser = await getUserData();

        if (savedToken && savedUser) {
          setTokenState(savedToken);
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Failed to load auth data', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (newToken, newUser) => {
    if (!newToken || !newUser) {
      throw new Error('Invalid login payload');
    }
    try {
      await setToken(newToken);
      await setUserData(newUser);
      setTokenState(newToken);
      setUser(newUser);
    } catch (error) {
      console.error('Failed to save auth data on login', error);
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      await removeUserData();
      setTokenState(null);
      setUser(null);
    } catch (error) {
      console.error('Failed to remove auth data on logout', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
