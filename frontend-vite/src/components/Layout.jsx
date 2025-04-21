// src/components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-white text-gray-800">
      {children}
    </div>
  );
};

export default Layout;
