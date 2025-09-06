const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://gargpiyush314:wt5LQlbYsjmPHRqh@cluster0.e2xebxb.mongodb.net/StudentMgmt?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas for migration'))
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
    },
    activities: [
      { name: 'Science Fair', date: '2024-03-15', type: 'Technical', description: 'Participated in inter-school science fair' },
      { name: 'Debate Competition', date: '2024-02-20', type: 'Cultural', description: 'Won second place in debate competition' },
      { name: 'Sports Day', date: '2024-01-10', type: 'Sports', description: 'Participated in 100m race' },
      { name: 'Community Service', date: '2023-12-05', type: 'Volunteering', description: 'Helped in local community cleanup' }
    ]
  },
  {
    id: 2,
    name: 'Parent1',
    type: 'parent',
    username: 'parent1@example.com',
    password: 'pass123',
    linkedStudentId: 1,
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
    },
    activities: [
      { name: 'Art Exhibition', date: '2024-02-10', type: 'Cultural', description: 'Participated in school art exhibition' },
      { name: 'Football Tournament', date: '2024-01-25', type: 'Sports', description: 'Team player in inter-school football tournament' },
      { name: 'Coding Workshop', date: '2023-11-15', type: 'Technical', description: 'Attended advanced coding workshop' }
    ]
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
      email: 'parent2@example.com',
      phone: '5566778899'
    }
  },
  {
    id: 5,
    name: 'Priya',
    type: 'student',
    username: 'student3',
    password: 'pass123',
    attendance: 92,
    averageMarks: 88,
    activitiesCount: 6,
    marks: {
      Math: 85,
      Physics: 88,
      Chemistry: 82,
      English: 92,
      Computer: 95
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 2,
      Technical: 2,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'Physics', mtt1: 86, mtt2: 90, rtu: 88 },
      { subject: 'Chemistry', mtt1: 80, mtt2: 84, rtu: 82 },
      { subject: 'English', mtt1: 90, mtt2: 94, rtu: 92 },
      { subject: 'Computer', mtt1: 93, mtt2: 97, rtu: 95 }
    ],
    profile: {
      email: 'priya@example.com',
      phone: '6677889900'
    },
    activities: [
      { name: 'Dance Competition', date: '2024-03-20', type: 'Cultural', description: 'Won first place in classical dance' },
      { name: 'Robotics Workshop', date: '2024-02-15', type: 'Technical', description: 'Built autonomous robot' },
      { name: 'Basketball Team', date: '2024-01-20', type: 'Sports', description: 'School basketball team captain' },
      { name: 'Blood Donation Camp', date: '2023-12-10', type: 'Volunteering', description: 'Organized blood donation drive' },
      { name: 'Science Quiz', date: '2023-11-25', type: 'Technical', description: 'Won inter-school science quiz' },
      { name: 'Cultural Fest', date: '2023-10-30', type: 'Cultural', description: 'Performed in school cultural fest' }
    ]
  },
  {
    id: 6,
    name: 'Parent3',
    type: 'parent',
    username: 'parent3@example.com',
    password: 'pass123',
    linkedStudentId: 5,
    attendance: 92,
    averageMarks: 88,
    activitiesCount: 6,
    marks: {
      Math: 85,
      Physics: 88,
      Chemistry: 82,
      English: 92,
      Computer: 95
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 2,
      Technical: 2,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'Physics', mtt1: 86, mtt2: 90, rtu: 88 },
      { subject: 'Chemistry', mtt1: 80, mtt2: 84, rtu: 82 },
      { subject: 'English', mtt1: 90, mtt2: 94, rtu: 92 },
      { subject: 'Computer', mtt1: 93, mtt2: 97, rtu: 95 }
    ],
    profile: {
      email: 'parent3@example.com',
      phone: '7788990011'
    }
  },
  {
    id: 7,
    name: 'Rahul',
    type: 'student',
    username: 'student4',
    password: 'pass123',
    attendance: 65,
    averageMarks: 68,
    activitiesCount: 2,
    marks: {
      Math: 65,
      Physics: 68,
      Chemistry: 62,
      English: 75,
      Computer: 70
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 0,
      Technical: 1,
      Volunteering: 0
    },
    results: [
      { subject: 'Math', mtt1: 63, mtt2: 67, rtu: 65 },
      { subject: 'Physics', mtt1: 66, mtt2: 70, rtu: 68 },
      { subject: 'Chemistry', mtt1: 60, mtt2: 64, rtu: 62 },
      { subject: 'English', mtt1: 73, mtt2: 77, rtu: 75 },
      { subject: 'Computer', mtt1: 68, mtt2: 72, rtu: 70 }
    ],
    profile: {
      email: 'rahul@example.com',
      phone: '8899001122'
    },
    activities: [
      { name: 'Cricket Match', date: '2024-02-05', type: 'Sports', description: 'Participated in inter-school cricket' },
      { name: 'Basic Coding', date: '2023-11-20', type: 'Technical', description: 'Completed basic programming course' }
    ]
  },
  {
    id: 8,
    name: 'Parent4',
    type: 'parent',
    username: 'parent4@example.com',
    password: 'pass123',
    linkedStudentId: 7,
    attendance: 65,
    averageMarks: 68,
    activitiesCount: 2,
    marks: {
      Math: 65,
      Physics: 68,
      Chemistry: 62,
      English: 75,
      Computer: 70
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 0,
      Technical: 1,
      Volunteering: 0
    },
    results: [
      { subject: 'Math', mtt1: 63, mtt2: 67, rtu: 65 },
      { subject: 'Physics', mtt1: 66, mtt2: 70, rtu: 68 },
      { subject: 'Chemistry', mtt1: 60, mtt2: 64, rtu: 62 },
      { subject: 'English', mtt1: 73, mtt2: 77, rtu: 75 },
      { subject: 'Computer', mtt1: 68, mtt2: 72, rtu: 70 }
    ],
    profile: {
      email: 'parent4@example.com',
      phone: '9900112233'
    }
  },
  {
    id: 9,
    name: 'Sneha',
    type: 'student',
    username: 'student5',
    password: 'pass123',
    attendance: 88,
    averageMarks: 84,
    activitiesCount: 4,
    marks: {
      Math: 80,
      Physics: 85,
      Chemistry: 78,
      English: 89,
      Computer: 88
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 1,
      Technical: 1,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'Physics', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'Chemistry', mtt1: 76, mtt2: 80, rtu: 78 },
      { subject: 'English', mtt1: 87, mtt2: 91, rtu: 89 },
      { subject: 'Computer', mtt1: 86, mtt2: 90, rtu: 88 }
    ],
    profile: {
      email: 'sneha@example.com',
      phone: '0011223344'
    },
    activities: [
      { name: 'Music Competition', date: '2024-03-10', type: 'Cultural', description: 'Won second place in singing competition' },
      { name: 'Web Development Workshop', date: '2024-02-08', type: 'Technical', description: 'Learned HTML, CSS, JavaScript' },
      { name: 'Volleyball', date: '2024-01-15', type: 'Sports', description: 'School volleyball team' },
      { name: 'Tree Plantation', date: '2023-12-20', type: 'Volunteering', description: 'Participated in school tree plantation drive' }
    ]
  },
  {
    id: 10,
    name: 'Parent5',
    type: 'parent',
    username: 'parent5@example.com',
    password: 'pass123',
    linkedStudentId: 9,
    attendance: 88,
    averageMarks: 84,
    activitiesCount: 4,
    marks: {
      Math: 80,
      Physics: 85,
      Chemistry: 78,
      English: 89,
      Computer: 88
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 1,
      Technical: 1,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'Physics', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'Chemistry', mtt1: 76, mtt2: 80, rtu: 78 },
      { subject: 'English', mtt1: 87, mtt2: 91, rtu: 89 },
      { subject: 'Computer', mtt1: 86, mtt2: 90, rtu: 88 }
    ],
    profile: {
      email: 'parent5@example.com',
      phone: '1122334455'
    }
  },
  {
    id: 11,
    name: 'Vikram',
    type: 'student',
    username: 'student6',
    password: 'pass123',
    attendance: 95,
    averageMarks: 91,
    activitiesCount: 7,
    marks: {
      Math: 88,
      Physics: 92,
      Chemistry: 85,
      English: 95,
      Computer: 98
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 2,
      Technical: 2,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 86, mtt2: 90, rtu: 88 },
      { subject: 'Physics', mtt1: 90, mtt2: 94, rtu: 92 },
      { subject: 'Chemistry', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'English', mtt1: 93, mtt2: 97, rtu: 95 },
      { subject: 'Computer', mtt1: 96, mtt2: 100, rtu: 98 }
    ],
    profile: {
      email: 'vikram@example.com',
      phone: '2233445566'
    },
    activities: [
      { name: 'Chess Championship', date: '2024-03-25', type: 'Technical', description: 'Won school chess championship' },
      { name: 'Drama Club', date: '2024-02-28', type: 'Cultural', description: 'Lead actor in school play' },
      { name: 'Swimming Competition', date: '2024-02-10', type: 'Sports', description: 'Gold medal in 200m freestyle' },
      { name: 'AI Workshop', date: '2024-01-30', type: 'Technical', description: 'Advanced AI and machine learning workshop' },
      { name: 'Debate Team', date: '2024-01-05', type: 'Cultural', description: 'School debate team captain' },
      { name: 'Marathon', date: '2023-12-15', type: 'Sports', description: 'Completed 5km charity run' },
      { name: 'Teaching Program', date: '2023-11-10', type: 'Volunteering', description: 'Tutored underprivileged students' }
    ]
  },
  {
    id: 12,
    name: 'Parent6',
    type: 'parent',
    username: 'parent6@example.com',
    password: 'pass123',
    linkedStudentId: 11,
    attendance: 95,
    averageMarks: 91,
    activitiesCount: 7,
    marks: {
      Math: 88,
      Physics: 92,
      Chemistry: 85,
      English: 95,
      Computer: 98
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 2,
      Technical: 2,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 86, mtt2: 90, rtu: 88 },
      { subject: 'Physics', mtt1: 90, mtt2: 94, rtu: 92 },
      { subject: 'Chemistry', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'English', mtt1: 93, mtt2: 97, rtu: 95 },
      { subject: 'Computer', mtt1: 96, mtt2: 100, rtu: 98 }
    ],
    profile: {
      email: 'parent6@example.com',
      phone: '3344556677'
    }
  },
  {
    id: 13,
    name: 'Anjali',
    type: 'student',
    username: 'student7',
    password: 'pass123',
    attendance: 72,
    averageMarks: 74,
    activitiesCount: 3,
    marks: {
      Math: 70,
      Physics: 74,
      Chemistry: 68,
      English: 82,
      Computer: 76
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 1,
      Technical: 0,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 68, mtt2: 72, rtu: 70 },
      { subject: 'Physics', mtt1: 72, mtt2: 76, rtu: 74 },
      { subject: 'Chemistry', mtt1: 66, mtt2: 70, rtu: 68 },
      { subject: 'English', mtt1: 80, mtt2: 84, rtu: 82 },
      { subject: 'Computer', mtt1: 74, mtt2: 78, rtu: 76 }
    ],
    profile: {
      email: 'anjali@example.com',
      phone: '4455667788'
    },
    activities: [
      { name: 'Badminton', date: '2024-02-12', type: 'Sports', description: 'School badminton team' },
      { name: 'Poetry Recitation', date: '2024-01-18', type: 'Cultural', description: 'Participated in poetry competition' },
      { name: 'Animal Shelter', date: '2023-12-08', type: 'Volunteering', description: 'Volunteered at local animal shelter' }
    ]
  },
  {
    id: 14,
    name: 'Parent7',
    type: 'parent',
    username: 'parent7@example.com',
    password: 'pass123',
    linkedStudentId: 13,
    attendance: 72,
    averageMarks: 74,
    activitiesCount: 3,
    marks: {
      Math: 70,
      Physics: 74,
      Chemistry: 68,
      English: 82,
      Computer: 76
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 1,
      Technical: 0,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 68, mtt2: 72, rtu: 70 },
      { subject: 'Physics', mtt1: 72, mtt2: 76, rtu: 74 },
      { subject: 'Chemistry', mtt1: 66, mtt2: 70, rtu: 68 },
      { subject: 'English', mtt1: 80, mtt2: 84, rtu: 82 },
      { subject: 'Computer', mtt1: 74, mtt2: 78, rtu: 76 }
    ],
    profile: {
      email: 'parent7@example.com',
      phone: '5566778899'
    }
  },
  {
    id: 15,
    name: 'Karan',
    type: 'student',
    username: 'student8',
    password: 'pass123',
    attendance: 89,
    averageMarks: 86,
    activitiesCount: 5,
    marks: {
      Math: 82,
      Physics: 87,
      Chemistry: 80,
      English: 91,
      Computer: 89
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 1,
      Technical: 1,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 80, mtt2: 84, rtu: 82 },
      { subject: 'Physics', mtt1: 85, mtt2: 89, rtu: 87 },
      { subject: 'Chemistry', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'English', mtt1: 89, mtt2: 93, rtu: 91 },
      { subject: 'Computer', mtt1: 87, mtt2: 91, rtu: 89 }
    ],
    profile: {
      email: 'karan@example.com',
      phone: '6677889900'
    },
    activities: [
      { name: 'Football Tournament', date: '2024-03-05', type: 'Sports', description: 'Captain of school football team' },
      { name: 'Photography Club', date: '2024-02-20', type: 'Cultural', description: 'School photography contest winner' },
      { name: 'IoT Workshop', date: '2024-01-25', type: 'Technical', description: 'Internet of Things workshop' },
      { name: 'Beach Cleanup', date: '2023-12-12', type: 'Volunteering', description: 'Coastal cleanup drive' },
      { name: 'Hockey Match', date: '2023-11-18', type: 'Sports', description: 'Inter-school hockey tournament' }
    ]
  },
  {
    id: 16,
    name: 'Parent8',
    type: 'parent',
    username: 'parent8@example.com',
    password: 'pass123',
    linkedStudentId: 15,
    attendance: 89,
    averageMarks: 86,
    activitiesCount: 5,
    marks: {
      Math: 82,
      Physics: 87,
      Chemistry: 80,
      English: 91,
      Computer: 89
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 1,
      Technical: 1,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 80, mtt2: 84, rtu: 82 },
      { subject: 'Physics', mtt1: 85, mtt2: 89, rtu: 87 },
      { subject: 'Chemistry', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'English', mtt1: 89, mtt2: 93, rtu: 91 },
      { subject: 'Computer', mtt1: 87, mtt2: 91, rtu: 89 }
    ],
    profile: {
      email: 'parent8@example.com',
      phone: '7788990011'
    }
  },
  {
    id: 17,
    name: 'Meera',
    type: 'student',
    username: 'student9',
    password: 'pass123',
    attendance: 76,
    averageMarks: 79,
    activitiesCount: 4,
    marks: {
      Math: 75,
      Physics: 80,
      Chemistry: 73,
      English: 85,
      Computer: 82
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 2,
      Technical: 0,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 73, mtt2: 77, rtu: 75 },
      { subject: 'Physics', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'Chemistry', mtt1: 71, mtt2: 75, rtu: 73 },
      { subject: 'English', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'Computer', mtt1: 80, mtt2: 84, rtu: 82 }
    ],
    profile: {
      email: 'meera@example.com',
      phone: '8899001122'
    },
    activities: [
      { name: 'Table Tennis', date: '2024-02-25', type: 'Sports', description: 'School table tennis champion' },
      { name: 'Folk Dance', date: '2024-02-14', type: 'Cultural', description: 'Traditional folk dance performance' },
      { name: 'Painting Exhibition', date: '2024-01-12', type: 'Cultural', description: 'Art exhibition participant' },
      { name: 'Old Age Home Visit', date: '2023-12-22', type: 'Volunteering', description: 'Visited and helped elderly people' }
    ]
  },
  {
    id: 18,
    name: 'Parent9',
    type: 'parent',
    username: 'parent9@example.com',
    password: 'pass123',
    linkedStudentId: 17,
    attendance: 76,
    averageMarks: 79,
    activitiesCount: 4,
    marks: {
      Math: 75,
      Physics: 80,
      Chemistry: 73,
      English: 85,
      Computer: 82
    },
    activityParticipation: {
      Sports: 1,
      Cultural: 2,
      Technical: 0,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 73, mtt2: 77, rtu: 75 },
      { subject: 'Physics', mtt1: 78, mtt2: 82, rtu: 80 },
      { subject: 'Chemistry', mtt1: 71, mtt2: 75, rtu: 73 },
      { subject: 'English', mtt1: 83, mtt2: 87, rtu: 85 },
      { subject: 'Computer', mtt1: 80, mtt2: 84, rtu: 82 }
    ],
    profile: {
      email: 'parent9@example.com',
      phone: '9900112233'
    }
  },
  {
    id: 19,
    name: 'Arjun',
    type: 'student',
    username: 'student10',
    password: 'pass123',
    attendance: 91,
    averageMarks: 87,
    activitiesCount: 6,
    marks: {
      Math: 83,
      Physics: 88,
      Chemistry: 81,
      English: 92,
      Computer: 90
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 1,
      Technical: 2,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 81, mtt2: 85, rtu: 83 },
      { subject: 'Physics', mtt1: 86, mtt2: 90, rtu: 88 },
      { subject: 'Chemistry', mtt1: 79, mtt2: 83, rtu: 81 },
      { subject: 'English', mtt1: 90, mtt2: 94, rtu: 92 },
      { subject: 'Computer', mtt1: 88, mtt2: 92, rtu: 90 }
    ],
    profile: {
      email: 'arjun@example.com',
      phone: '0011223344'
    },
    activities: [
      { name: 'Basketball Championship', date: '2024-03-18', type: 'Sports', description: 'School basketball championship winner' },
      { name: 'Theater Production', date: '2024-02-22', type: 'Cultural', description: 'Supporting role in school play' },
      { name: 'Cybersecurity Workshop', date: '2024-02-05', type: 'Technical', description: 'Basic cybersecurity training' },
      { name: 'Mobile App Development', date: '2024-01-08', type: 'Technical', description: 'Flutter app development workshop' },
      { name: 'Tennis Tournament', date: '2023-12-18', type: 'Sports', description: 'School tennis tournament' },
      { name: 'Food Distribution', date: '2023-11-28', type: 'Volunteering', description: 'Helped distribute food to needy families' }
    ]
  },
  {
    id: 20,
    name: 'Parent10',
    type: 'parent',
    username: 'parent10@example.com',
    password: 'pass123',
    linkedStudentId: 19,
    attendance: 91,
    averageMarks: 87,
    activitiesCount: 6,
    marks: {
      Math: 83,
      Physics: 88,
      Chemistry: 81,
      English: 92,
      Computer: 90
    },
    activityParticipation: {
      Sports: 2,
      Cultural: 1,
      Technical: 2,
      Volunteering: 1
    },
    results: [
      { subject: 'Math', mtt1: 81, mtt2: 85, rtu: 83 },
      { subject: 'Physics', mtt1: 86, mtt2: 90, rtu: 88 },
      { subject: 'Chemistry', mtt1: 79, mtt2: 83, rtu: 81 },
      { subject: 'English', mtt1: 90, mtt2: 94, rtu: 92 },
      { subject: 'Computer', mtt1: 88, mtt2: 92, rtu: 90 }
    ],
    profile: {
      email: 'parent10@example.com',
      phone: '1122334455'
    }
  }
];

async function migrateData() {
  try {
    console.log('Starting data migration...');

    // Clear existing data
    await Student.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Student.insertMany(students);
    console.log('Data migration completed successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Migration error:', error);
    mongoose.connection.close();
  }
}

migrateData();
