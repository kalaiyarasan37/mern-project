import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-[#007f8f] text-white p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white text-[#007f8f] px-4 py-2 rounded hover:bg-[#e0f7fa] font-semibold"
          >
            ⬅ Back
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-white text-[#007f8f] px-4 py-2 rounded hover:bg-[#e0f7fa] font-semibold"
          >
            🏠 Home
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="w-full bg-white text-[#007f8f] px-4 py-2 rounded hover:bg-[#e0f7fa] font-semibold"
          >
            📄 Upload Resume
          </button>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-semibold"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-[#e0f7fa] to-[#f0fdfd] p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
