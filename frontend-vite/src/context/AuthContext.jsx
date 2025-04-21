import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const login = async (loginId, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        loginId,
        password,
      });
      const { token, role } = response.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setToken(token);
      setRole(role);

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setToken('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, role, setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
