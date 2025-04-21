import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const { login } = useAuth(); // ✅ use custom hook
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginId, password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center text-[#007f8f]">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          name="loginId"
          placeholder="Login ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007f8f] placeholder:italic"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007f8f] placeholder:italic"
        />
        <button
          type="submit"
          className="w-full bg-[#007f8f] text-white font-semibold py-2 rounded-md hover:bg-[#005f68] transition duration-300"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
