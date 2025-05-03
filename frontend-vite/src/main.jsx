import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct way in React 18+
import './index.css';
import App from './App';

import { AuthProvider } from './context/AuthContext'; // Ensure the correct path
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import reportWebVitals from './reportWebVitals';

// Ensure there is only ONE root rendering method
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap the entire app with Router */}
    <Router>
      {/* Provide authentication context */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// For performance measuring (optional)
reportWebVitals();