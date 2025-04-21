import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { token, role, setToken, setRole } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          alert(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (!token) {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [token, navigate]);

  if (!userData) {
    return (
      <div className="flex h-screen bg-[#e6f2f5]">
        <Sidebar />
        <div className="flex-1 p-8 overflow-auto">
          <p className="text-center mt-20 text-gray-600 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#e6f2f5]">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto h-full flex flex-col">
          {/* Welcome heading */}
          <h2 className="text-3xl font-bold text-center text-[#006400] mb-6">
            Welcome, {userData.name}
          </h2>
          
          {/* User details section */}
          <div className="space-y-3 text-gray-800 text-lg mb-6">
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Login ID:</strong> {userData.loginId}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>

          {/* Admin/Student content */}
          <div className="flex-1">
            {userData.role === 'admin' ? (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#006400]">Admin Actions</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-[#1a6a8f] text-white px-6 py-3 rounded-md hover:bg-[#145674] transition text-lg"
                  >
                    Register User
                  </button>
                  <button
                    onClick={() => navigate('/studentmanagement')}
                    className="bg-[#1d7ea6] text-white px-6 py-3 rounded-md hover:bg-[#166286] transition text-lg"
                  >
                    Manage Students
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-[#1d7ea6]">Student Dashboard</h3>
                <p className="text-gray-700 mt-4 text-lg">
                  You are logged in as a student. Access your courses and materials below.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-[#1d7ea6] text-white p-4 rounded-lg hover:bg-[#166286] transition">
                    My Courses
                  </button>
                  <button className="bg-[#1d7ea6] text-white p-4 rounded-lg hover:bg-[#166286] transition">
                    View Assignments
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout button at bottom */}
          <button
            onClick={logout}
            className="mt-auto bg-[#c23b22] text-white py-3 rounded-md hover:bg-[#a5321c] transition text-lg w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;