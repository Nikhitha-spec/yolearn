import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, BookOpen, Plus, Users, User, Bell, 
  TrendingUp, Award, MessageCircle, Settings 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const EnhancedSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useAppStore();

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      path: '/dashboard',
      description: 'Overview & Analytics'
    },
    { 
      id: 'skills', 
      label: 'Browse Skills', 
      icon: BookOpen, 
      path: '/skills',
      description: 'Discover & Learn'
    },
    { 
      id: 'post-skill', 
      label: 'Share Skill', 
      icon: Plus, 
      path: '/post-skill',
      description: 'Teach Others'
    },
    { 
      id: 'matches', 
      label: 'My Matches', 
      icon: Users, 
      path: '/matches',
      description: 'Connections & Exchanges'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/profile',
      description: 'Manage Account'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      path: '/notifications',
      description: 'Updates & Messages',
      badge: unreadCount > 0 ? unreadCount : null
    }
  ];

  const quickStats = [
    { label: 'Skills Learned', value: '12', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Skills Taught', value: '8', icon: Award, color: 'text-purple-600' },
    { label: 'Active Matches', value: '5', icon: Users, color: 'text-blue-600' }
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
            Quick Stats
          </h3>
          <div className="space-y-2">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </span>
                </div>
                <span className={`font-semibold ${stat.color}`}>
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
            Navigation
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className={`text-xs ${
                        isActive 
                          ? 'text-purple-100' 
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {item.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  New match found!
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-4">
                Sarah wants to learn React
              </p>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700 dark:text-green-300 font-medium">
                  Skill completed
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-4">
                UI/UX Design basics
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/post-skill')}
              className="w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Share New Skill</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start Chat</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </aside>
  );
};

export default EnhancedSidebar;