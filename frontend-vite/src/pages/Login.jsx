import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from "../components/AuthLayout";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: ''    
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(credentials.loginId, credentials.password);
      if (success) {
        toast.success('Login successful!');
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center text-[#007f8f]">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="loginId"
          placeholder="Login ID"
          value={credentials.loginId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007f8f]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007f8f]"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#007f8f] text-white font-semibold py-2 rounded-md transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#005f68]'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import AuthLayout from "../components/AuthLayout";

// const Login = () => {
//   const { login } = useAuth(); // ✅ use custom hook
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const success = await login(loginId, password);
//     if (success) {
//       navigate("/dashboard");
//     } else {
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <AuthLayout>
//       <h2 className="text-3xl font-bold mb-6 text-center text-[#007f8f]">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="text"
//           name="loginId"
//           placeholder="Login ID"
//           value={loginId}
//           onChange={(e) => setLoginId(e.target.value)}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007f8f] placeholder:italic"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007f8f] placeholder:italic"
//         />
//         <button
//           type="submit"
//           className="w-full bg-[#007f8f] text-white font-semibold py-2 rounded-md hover:bg-[#005f68] transition duration-300"
//         >
//           Login
//         </button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default Login;
