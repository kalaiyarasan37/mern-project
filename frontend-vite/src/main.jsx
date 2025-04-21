import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct way in React 18+
import './index.css';
import App from './App';

import { AuthProvider } from './context/AuthContext'; // Ensure the correct path
import reportWebVitals from './reportWebVitals';

// Ensure there is only ONE root rendering method
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// For performance measuring (optional)
reportWebVitals();
