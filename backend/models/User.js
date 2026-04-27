const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'teacher'], default: 'student' },
  profileImage: { type: String, default: '' },
  // Specific fields
  studentDetails: {
    grade: String,
    section: String,
    rollNumber: String,
    attendance: [{ date: Date, status: { type: String, enum: ['present', 'absent'] } }],
    marks: [{ subject: String, score: Number, total: Number }]
  },
  teacherDetails: {
    subjects: [String],
    classes: [String]
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
