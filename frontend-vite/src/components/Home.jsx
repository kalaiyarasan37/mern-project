import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to Placement Cell</h2>
      <Link to="/add-student">Add Student</Link> | <Link to="/students">View Students</Link>
    </div>
  );
}

export default Home;
