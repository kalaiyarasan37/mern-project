import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.department} - {student.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
