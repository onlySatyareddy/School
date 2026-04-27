const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'campus_gallery'
  title: String,
  content: mongoose.Schema.Types.Mixed, // Can be array of images or text
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('CMS', cmsSchema);
