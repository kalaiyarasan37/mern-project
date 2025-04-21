import React from 'react';
import Layout from './components/Layout';

import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/StudentManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />

          {/* Protected Routes */}
           <Route path="/register" element={<ProtectedRoute element={<Layout><Register /></Layout>} allowedRoles={['admin']} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Layout><Dashboard /></Layout>} allowedRoles={['admin', 'student']} />} />
          <Route path="/studentmanagement" element={<ProtectedRoute element={<Layout><StudentManagement /></Layout>} allowedRoles={['admin', 'student']} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
