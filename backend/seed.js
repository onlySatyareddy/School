const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/school_management');
    console.log('Connected to MongoDB for seeding');

    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = new User({
        name: 'Super Admin',
        email: 'admin@antigravity.edu',
        password: 'adminpassword', // Will be hashed by pre-save hook
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user seeded: admin@antigravity.edu / adminpassword');
    } else {
      console.log('Admin already exists');
    }

    // Seed a teacher and student
    const teacherExists = await User.findOne({ role: 'teacher' });
    if (!teacherExists) {
      const teacher = new User({
        name: 'Prof. Smith',
        email: 'teacher@antigravity.edu',
        password: 'teacherpassword',
        role: 'teacher',
        teacherDetails: { subjects: ['Math', 'Physics'], classes: ['10A', '11B'] }
      });
      await teacher.save();
      console.log('Teacher seeded');
    }

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedAdmin();
