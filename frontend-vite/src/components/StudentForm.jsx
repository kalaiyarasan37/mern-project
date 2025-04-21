import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      email,
      phone,
      department,
      year
    };

    try {
      await axios.post('http://localhost:5000/api/students', newStudent);
      alert('Student added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <br />

      <label>Email: </label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br />

      <label>Phone: </label>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <br />

      <label>Department: </label>
      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
      <br />

      <label>Year: </label>
      <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
      <br />

      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
