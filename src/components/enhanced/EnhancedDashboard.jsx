import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, BookOpen, Award, Target, 
  Clock, Star, ArrowRight, Plus, MessageCircle 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useAppStore from '../../store/useAppStore';

const EnhancedDashboard = () => {
  const { 
    user, 
    skills, 
    matches, 
    notifications,
    addNotification 
  } = useAppStore();

  useEffect(() => {
    // Add welcome notification for demo
    if (user && notifications.length === 0) {
      addNotification({
        title: 'Welcome to YoLearn!',
        message: 'Start exploring skills and connect with peers to begin your learning journey.',
        type: 'welcome'
      });
    }
  }, [user, notifications.length, addNotification]);

  const learningData = [
    { name: 'Mon', skills: 2, hours: 3 },
    { name: 'Tue', skills: 3, hours: 4 },
    { name: 'Wed', skills: 1, hours: 2 },
    { name: 'Thu', skills: 4, hours: 5 },
    { name: 'Fri', skills: 2, hours: 3 },
    { name: 'Sat', skills: 5, hours: 6 },
    { name: 'Sun', skills: 3, hours: 4 }
  ];

  const skillDistribution = [
    { name: 'Programming', value: 35, color: '#8B5CF6' },
    { name: 'Design', value: 25, color: '#EC4899' },
    { name: 'Languages', value: 20, color: '#3B82F6' },
    { name: 'Business', value: 12, color: '#10B981' },
    { name: 'Others', value: 8, color: '#F59E0B' }
  ];

  const statsCards = [
    {
      title: 'Skills Completed',
      value: '24',
      change: '+12%',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Matches',
      value: '8',
      change: '+25%',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Learning Hours',
      value: '142',
      change: '+8%',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Achievement Score',
      value: '1,847',
      change: '+15%',
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'match',
      title: 'New match found',
      description: 'Sarah Chen wants to learn React development',
      time: '2 hours ago',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 2,
      type: 'completion',
      title: 'Skill completed',
      description: 'Finished "Advanced JavaScript Concepts"',
      time: '1 day ago',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 3,
      type: 'message',
      title: 'New message',
      description: 'Alex Johnson sent you a message',
      time: '2 days ago',
      avatar: '/api/placeholder/32/32'
    }
  ];

  const recommendedSkills = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Michael Zhang',
      rating: 4.9,
      students: 156,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'UI Animation with Framer Motion',
      instructor: 'Emma Wilson',
      rating: 4.8,
      students: 89,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      instructor: 'Carlos Rodriguez',
      rating: 4.7,
      students: 234,
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-purple-100 mb-6">
            You're doing great! Keep up the momentum and explore new skills today.
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Share a Skill</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Skills</span>
            </motion.button>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Weekly Learning Progress
            </h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={learningData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Skill Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Skill Categories
            </h3>
            <Target className="w-5 h-5 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={skillDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {skillDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-4">
            {skillDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Recommended Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recent Activity
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={activity.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white text-sm">
                    {activity.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {activity.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recommended for You
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1"
            >
              <span>See All</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {recommendedSkills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
              >
                <img
                  src={skill.thumbnail}
                  alt={skill.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white text-sm">
                    {skill.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    by {skill.instructor}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {skill.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {skill.students} students
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;