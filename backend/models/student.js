import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  batch: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  rollNo: { type: String, required: true, unique: true }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
