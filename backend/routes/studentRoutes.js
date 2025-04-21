import express from 'express';
import { getAllStudents, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';    
import upload from '../middleware/uploadMiddleware.js';
import { uploadResume } from '../controllers/studentController.js';

const router = express.Router();

// Get all students
router.get('/', authenticateToken, authorizeRoles('admin'), getAllStudents);

// Update student
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateStudent);

// Delete student
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteStudent);

// Resume upload route
router.post('/:id/resume', upload.single('resume'), uploadResume);


export default router;
