const express = require('express');
const Announcement = require('../models/Announcement');
const router = express.Router();

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(10);
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create announcement (Admin only)
router.post('/', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
