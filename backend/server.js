import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import placementRoutes from './routes/placementRoutes.js';

// Load environment variables (should be at the top)
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Initialize Express app
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection (Using async/await for better error handling)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    console.log(`Database Name: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Placement Cell Backend is Running');
});

// Global Error Handler (Catches unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown (Ensures database closes properly on exit)
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Shutting down server...`);
    await mongoose.connection.close();
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
});
