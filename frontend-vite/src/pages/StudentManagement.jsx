import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../components/MainLayout';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [resumeFile, setResumeFile] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loginId: '',
    password: '',
    role: 'student',
  });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        console.error('Expected array of students, got:', res.data);
        setStudents([]);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      loginId: '',
      password: '',
      role: 'student',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/students/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/auth/register', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchStudents();
      resetForm();
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  const handleEdit = (id) => {
    const selectedStudent = students.find((s) => s._id === id);
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        loginId: selectedStudent.loginId,
        password: '',
        role: selectedStudent.role,
      });
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleResumeUpload = async (id, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/students/${id}/resume`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchStudents(); // Refresh list
    } catch (err) {
      console.error('Resume upload failed:', err);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-xl shadow-lg p-8 border border-[#cceff0]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#007f8f]">
          {editingId ? 'Edit Student' : 'Register Student'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded italic"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded italic"
            required
          />
          <input
            type="text"
            name="loginId"
            placeholder="Enter login ID"
            value={formData.loginId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded italic"
            required
          />
          <input
            type="password"
            name="password"
            placeholder={editingId ? 'Leave blank to keep current password' : 'Enter password'}
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded italic"
            required={!editingId}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded italic"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#007f8f] text-white px-6 py-3 rounded font-semibold hover:bg-[#006673] transition duration-200"
            >
              {editingId ? 'Update' : 'Register'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="text-2xl font-semibold mb-4 text-[#007f8f]">Registered Students</h3>

        {students.length === 0 ? (
          <p className="text-gray-500 italic">No students registered yet.</p>
        ) : (
          <table className="w-full border text-left text-sm">
            <thead className="bg-[#e0f7fa] text-[#007f8f]">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Login ID</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Resume</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border hover:bg-gray-100">
                  <td className="p-3 border">{student.name}</td>
                  <td className="p-3 border">{student.email}</td>
                  <td className="p-3 border">{student.loginId}</td>
                  <td className="p-3 border capitalize">{student.role}</td>
                  <td className="p-3 border">
                    {student.resume ? (
                      <a
                        href={`http://localhost:5000/${student.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                        download
                      >
                        Download
                      </a>
                    ) : (
                      'Not Uploaded'
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleResumeUpload(student._id, e.target.files[0])}
                      className="mt-1"
                    />
                  </td>
                  <td className="p-3 border flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default StudentManagement;
