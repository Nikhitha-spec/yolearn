import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, MapPin, Calendar, Edit3, Camera, 
  Star, Award, BookOpen, Users, Plus, X 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import toast from 'react-hot-toast';

const EnhancedProfile = () => {
  const { user, userSkills, addUserSkill, removeUserSkill } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    university: user?.university || '',
    location: user?.location || 'Not specified'
  });
  const [newSkill, setNewSkill] = useState('');
  const [showAddSkill, setShowAddSkill] = useState(false);

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addUserSkill({
        name: newSkill.trim(),
        level: 'Intermediate',
        yearsOfExperience: 1
      });
      setNewSkill('');
      setShowAddSkill(false);
      toast.success('Skill added successfully!');
    }
  };

  const handleRemoveSkill = (skillId) => {
    removeUserSkill(skillId);
    toast.success('Skill removed!');
  };

  const stats = [
    { label: 'Skills Learned', value: '12', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Skills Taught', value: '8', icon: Award, color: 'text-purple-600' },
    { label: 'Total Matches', value: '15', icon: Users, color: 'text-green-600' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600' }
  ];

  const achievements = [
    { name: 'First Match', icon: '🤝', description: 'Made your first skill exchange' },
    { name: 'Quick Learner', icon: '⚡', description: 'Completed 5 skills in one month' },
    { name: 'Great Teacher', icon: '👨‍🏫', description: 'Received 10+ positive reviews' },
    { name: 'Community Builder', icon: '🏗️', description: 'Helped 20+ students' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and showcase your skills
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </motion.button>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="px-6 pb-6">
          {/* Profile Picture & Basic Info */}
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 relative">
            <div className="relative">
              <img
                src={user?.avatar || '/api/placeholder/120/120'}
                alt={user?.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              />
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            <div className="flex-1 mt-4 md:mt-0 md:mb-4">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 outline-none text-gray-800 dark:text-white"
                    placeholder="Your Name"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    placeholder="Tell us about yourself..."
                    rows="3"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {user?.bio}
                  </p>
                </>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 outline-none"
                      placeholder="Location"
                    />
                  ) : (
                    <span>{editForm.location}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              My Skills
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddSkill(true)}
              className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          {showAddSkill && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddSkill(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            {userSkills.length > 0 ? (
              userSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {skill.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.level} • {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  No skills added yet. Click the + button to add your first skill!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Achievements
          </h3>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {achievement.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedProfile;