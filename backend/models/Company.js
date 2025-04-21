import mongoose from 'mongoose';

// Company Schema
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  jobPosition: { type: String, required: true },
  salary: { type: String, required: true }
});

const Company = mongoose.model('Company', companySchema);

export default Company;
