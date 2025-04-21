import mongoose from 'mongoose';

// Placement Schema
const placementSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  date: { type: Date, default: Date.now }
});

const Placement = mongoose.model('Placement', placementSchema);

export default Placement;
