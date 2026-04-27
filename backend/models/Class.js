const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Grade 10-A"
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subjects: [String],
  schedule: [{
    day: String,
    time: String,
    subject: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
