import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/StudentManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />

      {/* Protected Routes using new pattern */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/register" element={<Layout><Register /></Layout>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin', 'student']} />}>
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/studentmanagement" element={<Layout><StudentManagement /></Layout>} />
      </Route>
    </Routes>
  );
}

export default App;
