import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
    loading: true
  });

  const navigate = useNavigate();

  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        logout();
      } else {
        setAuthState({
          token,
          user: decoded,
          isAuthenticated: true,
          loading: false
        });
      }
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (loginId, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { loginId, password });
      const decoded = jwtDecode(data.token);

      localStorage.setItem('token', data.token);
      setAuthState({
        token: data.token,
        user: decoded,
        isAuthenticated: true,
        loading: false
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, initializeAuth }}>
      {!authState.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};