import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Enhanced password hashing function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Register User (Admin only)
export const registerUser = async (req, res) => {
  try {
    const { name, email, loginId, password, role } = req.body;

    // Input validation
    if (!name || !email || !loginId || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trimmedLoginId = loginId.trim();
    const trimmedPassword = password.trim();

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ loginId: trimmedLoginId }, { email }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Admin verification
    const admin = await User.findById(req.user.id);
    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Create new user with hashed password
    const newUser = new User({
      name,
      email,
      loginId: trimmedLoginId,
      password: await hashPassword(trimmedPassword),
      role,
    });

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ message: "Credentials required" });
    }

    const user = await User.findOne({ loginId: loginId.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        loginId: user.loginId,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// Get Authenticated User Info
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error in getUserInfo:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
