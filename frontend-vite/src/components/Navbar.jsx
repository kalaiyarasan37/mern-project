import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "#fff" }}>
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>Home</Link>
        {user && <Link to="/dashboard" style={{ color: "#fff", marginRight: "15px" }}>Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
