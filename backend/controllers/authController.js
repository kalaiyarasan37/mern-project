import process from 'process';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ✅ Register User (Admin only)
export const registerUser = async (req, res) => {
    try {
      const { name, email, loginId, password, role } = req.body;
  
      const trimmedLoginId = loginId.trim();
      const trimmedPassword = password.trim();
  
      const existingUser = await User.findOne({ loginId: trimmedLoginId });
      if (existingUser) {
        return res.status(400).json({ message: "Login ID already exists" });
      }
  
      const admin = await User.findById(req.user.id);
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json({ message: "Only admins can create new users." });
      }
  
      const newUser = new User({
        name,
        email,
        loginId: trimmedLoginId,
        password: trimmedPassword, // ✅ Let Mongoose handle hashing
        role,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: `${role} registered successfully` });
  
    } catch (error) {
      console.error("❌ Error in registerUser:", error);
      res.status(500).json({ message: "Error creating user", error });
    }
  };
  


// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    const trimmedLoginId = loginId.trim();
    const trimmedPassword = password.trim();

    console.log("🟡 Login attempt with loginId:", trimmedLoginId);

    const user = await User.findOne({ loginId: trimmedLoginId });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid login ID or password" });
    }

    console.log("🟢 Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log("🔍 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid login ID or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      role: user.role,
      loginId: user.loginId
    });

  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};


// ✅ Get Authenticated User Info
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ Error in getUserInfo:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
