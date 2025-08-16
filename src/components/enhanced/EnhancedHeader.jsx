import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Moon, Sun, User, Settings, LogOut, 
  GraduationCap, MessageCircle, Trophy 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import toast from 'react-hot-toast';

const EnhancedHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { 
    user, 
    isDarkMode, 
    toggleDarkMode, 
    logout, 
    notifications, 
    unreadCount,
    searchQuery,
    setSearchQuery,
    markAllNotificationsRead
  } = useAppStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setShowUserMenu(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      markAllNotificationsRead();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">YoLearn</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Enhanced Platform</p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 max-w-xl mx-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills, users, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
          >
            <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNotificationClick}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.div>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            !notification.read ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-800 dark:text-white font-medium">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src={user?.avatar || '/api/placeholder/32/32'}
                alt={user?.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.university}
                </p>
              </div>
            </motion.button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar || '/api/placeholder/40/40'}
                        alt={user?.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-white">Profile</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Trophy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-white">Achievements</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-white">Settings</span>
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default EnhancedHeader;