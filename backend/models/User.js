import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  loginId: { 
    type: String, 
    required: [true, 'Login ID is required'], 
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  role: { 
    type: String, 
    enum: {
      values: ['admin', 'student'],
      message: 'Role must be either admin or student'
    },
    required: true 
  },
  resume: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        return v === '' || /\.(pdf|docx?)$/i.test(v);
      },
      message: 'Resume must be PDF or DOC file'
    }
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method for login
userSchema.statics.findByCredentials = async function(loginId, password) {
  const user = await this.findOne({ loginId });
  if (!user) throw new Error('Invalid login credentials');
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid login credentials');
  
  return user;
};

export default mongoose.model('User', userSchema);