import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

// Get all students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    return null;
  }
};

// Update a student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    return null;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    return null;
  }
};
