import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00796b] to-[#004d40] px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-[#004d40] mb-8">Welcome to the Placement Cell</h1>
        <p className="text-lg text-center text-[#00796b] mb-8">
          Empowering students with placement opportunities.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-[#00796b] text-white px-6 py-2 rounded-md text-lg hover:bg-[#004d40] transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#004d40] text-white px-6 py-2 rounded-md text-lg hover:bg-[#00796b] transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
