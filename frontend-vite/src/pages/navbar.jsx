import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#004d40] p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-[#00796b]">Placement Cell</Link>
        </div>
        <div className="flex gap-6">
          <Link
            to="/dashboard"
            className="hover:text-[#00796b] transition"
          >
            Dashboard
          </Link>
          <Link
            to="/studentmanagement"
            className="hover:text-[#00796b] transition"
          >
            Manage Students
          </Link>
          <Link
            to="/login"
            className="hover:text-[#00796b] transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
