const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get teacher's students (by classes they teach)
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password').limit(30);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get teacher dashboard summary
router.get('/dashboard', async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: 'student' });
    res.json({
      studentCount,
      classesToday: 3,
      pendingMarks: 12,
      alerts: [
        { type: 'attendance', message: 'Robert Fox has 3 consecutive absences.', severity: 'high' },
        { type: 'performance', message: 'Alice Blue score dropped 15% in Math.', severity: 'medium' },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
