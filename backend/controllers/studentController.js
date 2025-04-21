import User from '../models/User.js';

// Get all students
export const getAllStudents = async (req, res) => {
    try {
      const students = await User.find({ role: 'student' }).select('-password');
      console.log("Fetched Students: ", students); // 🔍 Log the result
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Update student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

// Upload Resume
export const uploadResume = async (req, res) => {
    try {
      const studentId = req.params.id;
      const resumePath = req.file.path;
  
      const updatedStudent = await User.findByIdAndUpdate(
        studentId,
        { resume: resumePath },
        { new: true }
      );
  
      res.status(200).json({ message: 'Resume uploaded', student: updatedStudent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to upload resume' });
    }
  };
  module.exports = { uploadResume };

