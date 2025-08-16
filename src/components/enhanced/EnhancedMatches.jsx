import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageCircle, Star, Clock, Check, X, 
  Calendar, Video, Phone, MoreVertical, Filter 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const EnhancedMatches = () => {
  const { 
    matches, 
    pendingMatches, 
    acceptMatch, 
    rejectMatch,
    addNotification 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState('active');
  const [showFilters, setShowFilters] = useState(false);

  const handleAcceptMatch = (matchId) => {
    acceptMatch(matchId);
    addNotification({
      title: 'Match Accepted',
      message: 'You can now start collaborating with your new learning partner!',
      type: 'success'
    });
  };

  const handleRejectMatch = (matchId) => {
    rejectMatch(matchId);
  };

  const mockActiveMatches = [
    {
      id: 1,
      partnerName: 'Sarah Chen',
      partnerAvatar: '/api/placeholder/40/40',
      skill: 'React Development',
      mySkill: 'UI/UX Design',
      status: 'active',
      rating: 4.9,
      sessionsCompleted: 3,
      nextSession: '2024-08-17 14:00',
      progress: 60
    },
    {
      id: 2,
      partnerName: 'Michael Zhang',
      partnerAvatar: '/api/placeholder/40/40',
      skill: 'Spanish Conversation',
      mySkill: 'Web Development',
      status: 'active',
      rating: 4.7,
      sessionsCompleted: 5,
      nextSession: '2024-08-18 16:30',
      progress: 75
    }
  ];

  const mockPendingMatches = [
    {
      id: 3,
      partnerName: 'Emma Wilson',
      partnerAvatar: '/api/placeholder/40/40',
      skill: 'Photography',
      mySkill: 'React Development',
      status: 'pending',
      rating: 4.8,
      university: 'Stanford University',
      message: 'Hi! I\'d love to learn React from you in exchange for photography lessons.'
    },
    {
      id: 4,
      partnerName: 'Carlos Rodriguez',
      partnerAvatar: '/api/placeholder/40/40',
      skill: 'Guitar Playing',
      mySkill: 'Programming',
      status: 'pending',
      rating: 4.6,
      university: 'UCLA',
      message: 'Looking forward to teaching guitar and learning programming!'
    }
  ];

  const MatchCard = ({ match, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={match.partnerAvatar}
            alt={match.partnerName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {match.partnerName}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {match.rating}
              </span>
              {match.university && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {match.university}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
            You're Learning
          </p>
          <p className="font-medium text-gray-800 dark:text-white">
            {match.skill}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
            You're Teaching
          </p>
          <p className="font-medium text-gray-800 dark:text-white">
            {match.mySkill}
          </p>
        </div>
      </div>

      {type === 'active' && (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {match.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${match.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              ></motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Sessions: {match.sessionsCompleted}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Next: {new Date(match.nextSession).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>
        </>
      )}

      {type === 'pending' && (
        <>
          {match.message && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                "{match.message}"
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAcceptMatch(match.id)}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Accept</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRejectMatch(match.id)}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Decline</span>
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );

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
            My Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your skill exchange partnerships
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Matches</p>
              <p className="text-2xl font-bold">{mockActiveMatches.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pending Requests</p>
              <p className="text-2xl font-bold">{mockPendingMatches.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completed Sessions</p>
              <p className="text-2xl font-bold">
                {mockActiveMatches.reduce((acc, match) => acc + match.sessionsCompleted, 0)}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'active'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Active Matches ({mockActiveMatches.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'pending'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Pending Requests ({mockPendingMatches.length})
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'active' && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {mockActiveMatches.length > 0 ? (
                  mockActiveMatches.map((match, index) => (
                    <MatchCard key={match.id} match={match} type="active" />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      No active matches yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start browsing skills to find your first learning partner!
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {mockPendingMatches.length > 0 ? (
                  mockPendingMatches.map((match, index) => (
                    <MatchCard key={match.id} match={match} type="pending" />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      No pending requests
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      All caught up! Check back later for new match requests.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedMatches;