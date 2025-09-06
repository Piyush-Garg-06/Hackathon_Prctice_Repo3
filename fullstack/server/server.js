const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://gargpiyush314:wt5LQlbYsjmPHRqh@cluster0.e2xebxb.mongodb.net/StudentMgmt?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['student', 'parent'] },
  username: { type: String, required: true },
  password: { type: String, required: true },
  linkedStudentId: { type: Number },
  attendance: { type: Number, default: 0 },
  averageMarks: { type: Number, default: 0 },
  activitiesCount: { type: Number, default: 0 },
  marks: {
    Math: { type: Number, default: 0 },
    Physics: { type: Number, default: 0 },
    Chemistry: { type: Number, default: 0 },
    English: { type: Number, default: 0 },
    Computer: { type: Number, default: 0 }
  },
  activityParticipation: {
    Sports: { type: Number, default: 0 },
    Cultural: { type: Number, default: 0 },
    Technical: { type: Number, default: 0 },
    Volunteering: { type: Number, default: 0 }
  },
  results: [{
    subject: { type: String, required: true },
    mtt1: { type: Number, default: 0 },
    mtt2: { type: Number, default: 0 },
    rtu: { type: Number, default: 0 }
  }],
  profile: {
    email: { type: String },
    phone: { type: String }
  },
  activities: [{
    name: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }
  }]
});

const Student = mongoose.model('Student', studentSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data
const students = [
  {
    id: 1,
    name: 'Nitin',
    type: 'student',
    username: 'student1',
    password: 'pass123',
    attendance: 85,
    averageMarks: 82,
    activitiesCount: 5,
    marks: {
      Math: 78,
      Physics: 82,
      Chemistry: 75,
      English: 88,
      Computer: 90
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 1,
      Technical: 1,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 75, mtt2: 80, rtu: 78 },
      { subject: 'Physics', mtt1: 80, mtt2: 85, rtu: 82 },
      { subject: 'Chemistry', mtt1: 70, mtt2: 78, rtu: 75 },
      { subject: 'English', mtt1: 85, mtt2: 90, rtu: 88 },
      { subject: 'Computer', mtt1: 88, mtt2: 92, rtu: 90 }
    ],
    profile: {
      email: 'nitin@example.com',
      phone: '1234567890'
    }
  },
  {
    id: 2,
    name: 'Parent1',
    type: 'parent',
    username: 'parent1@example.com',
    password: 'pass123',
    linkedStudentId: 1, // Link to student
    attendance: 85, // Same as linked student
    averageMarks: 82,
    activitiesCount: 5,
    marks: {
      Math: 78,
      Physics: 82,
      Chemistry: 75,
      English: 88,
      Computer: 90
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 1,
      Technical: 1,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 75, mtt2: 80, rtu: 78 },
      { subject: 'Physics', mtt1: 80, mtt2: 85, rtu: 82 },
      { subject: 'Chemistry', mtt1: 70, mtt2: 78, rtu: 75 },
      { subject: 'English', mtt1: 85, mtt2: 90, rtu: 88 },
      { subject: 'Computer', mtt1: 88, mtt2: 92, rtu: 90 }
    ],
    profile: {
      email: 'parent1@example.com',
      phone: '0987654321'
    }
  },
  {
    id: 3,
    name: 'Amit',
    type: 'student',
    username: 'student2',
    password: 'pass123',
    attendance: 78,
    averageMarks: 75,
    activitiesCount: 3,
    marks: {
      Math: 72,
      Physics: 75,
      Chemistry: 70,
      English: 80,
      Computer: 85
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 1,
      Technical: 1,
      Volunteering: 0
    },
    results: [
      { subject: 'Math', mtt1: 70, mtt2: 75, rtu: 72 },
      { subject: 'Physics', mtt1: 72, mtt2: 78, rtu: 75 },
      { subject: 'Chemistry', mtt1: 68, mtt2: 72, rtu: 70 },
      { subject: 'English', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'Computer', mtt1: 83, mtt2: 87, rtu: 85 }
    ],
    profile: {
      email: 'amit@example.com',
      phone: '1122334455'
    }
  },
  {
    id: 4,
    name: 'Parent2',
    type: 'parent',
    username: 'parent2@example.com',
    password: 'pass123',
    linkedStudentId: 3,
    attendance: 78,
    averageMarks: 75,
    activities: 3,
    marks: {
      Math: 72,
      Physics: 75,
      Chemistry: 70,
      English: 80,
      Computer: 85
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 1,
      Technical: 1,
      Volunteering: 0
    },
    results: [
      { subject: 'Math', mtt1: 70, mtt2: 75, rtu: 72 },
      { subject: 'Physics', mtt1: 72, mtt2: 78, rtu: 75 },
      { subject: 'Chemistry', mtt1: 68, mtt2: 72, rtu: 70 },
      { subject: 'English', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'Computer', mtt1: 83, mtt2: 87, rtu: 85 }
    ],
    profile: {
      email: 'parent2@example.com',
      phone: '5566778899'
    }
  }
];

app.post('/login', async (req, res) => {
  const { username, password, userType } = req.body;
  try {
    const user = await Student.findOne({ username, password, type: userType });
    if (user) {
      res.json({ success: true, user: { id: user.id, name: user.name, type: user.type } });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/dashboard/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id, type: 'student' });
    if (student) {
      res.json({
        attendance: student.attendance,
        averageMarks: student.averageMarks,
        activities: student.activitiesCount || 0,
        marks: student.marks,
        activityParticipation: student.activityParticipation
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/attendance/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id, type: 'student' });
    if (student) {
      res.json({
        attendance: student.attendance,
        subjects: student.marks, // Assuming marks keys are subjects
        totalClasses: {
          Math: 40,
          Physics: 38,
          Chemistry: 42,
          English: 40,
          Computer: 35
        }
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/results/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id, type: 'student' });
    if (student) {
      res.json({ results: student.results });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/report/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id, type: 'student' });
    if (student) {
      res.json({
        name: student.name,
        attendance: student.attendance,
        averageMarks: student.averageMarks,
        activities: student.activitiesCount || 0
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/profile/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (student) {
      res.json({ profile: student.profile });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/activities/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id, type: 'student' });
    if (student) {
      // Return activities from database or default mock data if empty
      const activities = student.activities && student.activities.length > 0 ? student.activities : [
        { name: 'Science Fair', date: '2024-03-15', type: 'Technical', description: 'Participated in inter-school science fair' },
        { name: 'Debate Competition', date: '2024-02-20', type: 'Cultural', description: 'Won second place in debate competition' },
        { name: 'Sports Day', date: '2024-01-10', type: 'Sports', description: 'Participated in 100m race' },
        { name: 'Community Service', date: '2023-12-05', type: 'Volunteering', description: 'Helped in local community cleanup' }
      ];
      res.json({ activities });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
