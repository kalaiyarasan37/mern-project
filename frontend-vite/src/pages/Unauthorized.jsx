import { useAuth, useLocation } from 'react-router-dom';
import Layout from './Layout';
import './Unauthorized.css'; // For custom styling

const Unauthorized = () => {
  const { user } = useAuth();
  const location = useLocation();
  const state = location.state || {};

  return (
    <Layout showHeader={false}>
      <main className="unauthorized-container">
        <div className="unauthorized-card">
          <h1>🚫 Access Restricted</h1>
          
          <div className="message">
            {state?.requiredRole ? (
              <p>This area requires <strong>{state.requiredRole}</strong> privileges.</p>
            ) : (
              <p>You don't have permission to view this content.</p>
            )}
            
            {user && (
              <p>
                Logged in as: <span className="user-role">{user.role}</span>
              </p>
            )}
          </div>

          <div className="actions">
            {user ? (
              <button 
                className="primary"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            ) : (
              <button
                className="primary"
                onClick={() => navigate('/login', { state: { from: location } })}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Unauthorized;