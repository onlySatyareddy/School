const express = require('express');
const User = require('../models/User');
const { analyzePerformance } = require('../services/aiService');
const router = express.Router();

// Get insights for current student
router.get('/insights', async (req, res) => {
  try {
    // In real app, get student id from JWT (req.user.id)
    const student = await User.findOne({ role: 'student' }); // Demo: just get first student
    if (!student) return res.status(404).json({ error: 'Student not found' });
    
    const insights = analyzePerformance(student);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student's specific dashboard data (marks, attendance)
router.get('/dashboard', async (req, res) => {
  try {
    const student = await User.findOne({ role: 'student' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
