// Mock data for YoLearn platform

export const mockStats = [
  {
    title: 'Active Skills',
    value: '127',
    change: '+12%',
    trend: 'up',
    icon: '🎯'
  },
  {
    title: 'Successful Matches',
    value: '89',
    change: '+8%',
    trend: 'up',
    icon: '🤝'
  },
  {
    title: 'Students Helped',
    value: '156',
    change: '+15%',
    trend: 'up',
    icon: '👥'
  },
  {
    title: 'Avg Rating',
    value: '4.8',
    change: '+0.2',
    trend: 'up',
    icon: '⭐'
  }
];

export const mockSkills = [
  {
    id: 1,
    skillName: 'React Development',
    category: 'Programming',
    level: 'Intermediate',
    type: 'teach',
    description: 'Learn modern React with hooks, context, and best practices.',
    userName: 'Sarah Chen',
    userDepartment: 'Computer Science',
    userYear: 'Junior',
    rating: 4.9,
    sessionsCompleted: 12,
    datePosted: '2024-08-10'
  },
  {
    id: 2,
    skillName: 'Spanish Conversation',
    category: 'Languages',
    level: 'Beginner',
    type: 'teach',
    description: 'Practice conversational Spanish with a native speaker.',
    userName: 'Carlos Rodriguez',
    userDepartment: 'Literature',
    userYear: 'Senior',
    rating: 4.8,
    sessionsCompleted: 24,
    datePosted: '2024-08-12'
  },
  {
    id: 3,
    skillName: 'Calculus II',
    category: 'Mathematics',
    level: 'Advanced',
    type: 'learn',
    description: 'Need help with integration techniques and series.',
    userName: 'Mike Johnson',
    userDepartment: 'Engineering',
    userYear: 'Sophomore',
    rating: 0,
    sessionsCompleted: 0,
    datePosted: '2024-08-14'
  },
  {
    id: 4,
    skillName: 'Guitar Basics',
    category: 'Music',
    level: 'Beginner',
    type: 'teach',
    description: 'Learn acoustic guitar fundamentals and popular songs.',
    userName: 'Emma Williams',
    userDepartment: 'Music',
    userYear: 'Junior',
    rating: 4.7,
    sessionsCompleted: 18,
    datePosted: '2024-08-13'
  },
  {
    id: 5,
    skillName: 'Data Structures',
    category: 'Programming',
    level: 'Intermediate',
    type: 'teach',
    description: 'Master arrays, linked lists, trees, and algorithms.',
    userName: 'David Kim',
    userDepartment: 'Computer Science',
    userYear: 'Senior',
    rating: 4.9,
    sessionsCompleted: 15,
    datePosted: '2024-08-11'
  }
];

export const mockMatches = [
  {
    id: 1,
    learnerId: 2,
    teacherId: 1,
    skillId: 1,
    skillName: 'React Development',
    learnerName: 'John Doe',
    teacherName: 'Sarah Chen',
    status: 'accepted',
    scheduledDate: '2024-08-20',
    message: 'Hi! I\'m excited to learn React from you. When works best for you?'
  },
  {
    id: 2,
    learnerId: 1,
    teacherId: 3,
    skillId: 2,
    skillName: 'Spanish Conversation',
    learnerName: 'Alex Johnson',
    teacherName: 'Carlos Rodriguez',
    status: 'pending',
    scheduledDate: null,
    message: 'Hello! I\'d love to practice Spanish conversation with you.'
  },
  {
    id: 3,
    learnerId: 4,
    teacherId: 1,
    skillId: 4,
    skillName: 'Guitar Basics',
    learnerName: 'Lisa Park',
    teacherName: 'Emma Williams',
    status: 'completed',
    scheduledDate: '2024-08-15',
    message: 'Thanks for the great guitar lesson!'
  }
];

export const mockBadges = [
  { id: 1, name: 'First Match', icon: '🎯', description: 'Completed your first skill match' },
  { id: 2, name: 'Helpful Mentor', icon: '🏆', description: 'Helped 10+ students' },
  { id: 3, name: 'Quick Learner', icon: '⚡', description: 'Learned 5+ new skills' },
  { id: 4, name: 'Community Star', icon: '⭐', description: 'Received 4.5+ average rating' },
  { id: 5, name: 'Early Adopter', icon: '🚀', description: 'One of the first 100 users' },
  { id: 6, name: 'Skill Master', icon: '🎓', description: 'Expert in 3+ skill categories' },
  { id: 7, name: 'Super Helper', icon: '💫', description: 'Completed 25+ teaching sessions' },
  { id: 8, name: 'Rising Star', icon: '🌟', description: 'Top rated teacher this month' }
];

export const mockLeaderboard = [
  { rank: 1, name: 'Sarah Chen', department: 'Computer Science', points: 2450, badge: '👑' },
  { rank: 2, name: 'Carlos Rodriguez', department: 'Literature', points: 2380, badge: '🥈' },
  { rank: 3, name: 'Emma Williams', department: 'Music', points: 2150, badge: '🥉' },
  { rank: 4, name: 'David Kim', department: 'Computer Science', points: 1980, badge: '🏆' },
  { rank: 5, name: 'Alex Johnson', department: 'Engineering', points: 1850, badge: '⭐' }
];

export const categories = [
  { name: 'Programming', icon: '💻', count: 45 },
  { name: 'Languages', icon: '🗣️', count: 32 },
  { name: 'Mathematics', icon: '📊', count: 28 },
  { name: 'Music', icon: '🎵', count: 21 },
  { name: 'Art & Design', icon: '🎨', count: 19 },
  { name: 'Science', icon: '🔬', count: 15 },
  { name: 'Writing', icon: '✍️', count: 12 },
  { name: 'Sports', icon: '⚽', count: 8 }
];