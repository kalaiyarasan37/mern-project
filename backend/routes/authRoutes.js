import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', authMiddleware, adminMiddleware, registerUser);

// ✅ Add this route for fetching logged-in user's info
router.get('/user', authMiddleware,  getUserInfo);

export default router;
