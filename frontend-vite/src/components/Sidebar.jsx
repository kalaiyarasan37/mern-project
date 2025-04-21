import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { setToken, setRole } = useAuth(); // ✅ use custom hook

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
    navigate('/login');
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Resume uploaded:', file);
      // You can call your resume upload API here
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f0fdfc]">
      {/* Sidebar */}
      <div className="w-64 bg-[#004d40] text-white flex flex-col justify-between p-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="w-full text-left py-2 px-4 mb-4 bg-[#00695c] rounded hover:bg-[#00796b] transition"
          >
            ⬅️ Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-left py-2 px-4 mb-4 bg-[#00695c] rounded hover:bg-[#00796b] transition"
          >
            🏠 Home
          </button>
          <label className="block w-full">
            <span className="inline-block py-2 px-4 mb-4 bg-[#00695c] rounded hover:bg-[#00796b] transition cursor-pointer w-full text-left">
              📄 Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </span>
          </label>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-6xl">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
