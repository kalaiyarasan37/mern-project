import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#007f8f] to-white px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-[#007f8f]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
