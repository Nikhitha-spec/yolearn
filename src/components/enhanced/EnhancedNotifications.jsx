import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Check, X, Users, BookOpen, Star, 
  MessageCircle, Award, Clock, Filter 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const EnhancedNotifications = () => {
  const { 
    notifications, 
    markNotificationRead, 
    clearNotification, 
    markAllNotificationsRead,
    unreadCount 
  } = useAppStore();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match':
        return Users;
      case 'skill':
        return BookOpen;
      case 'rating':
        return Star;
      case 'message':
        return MessageCircle;
      case 'achievement':
        return Award;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'match':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'skill':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
      case 'rating':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'message':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'achievement':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-700';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const NotificationCard = ({ notification, index }) => {
    const Icon = getNotificationIcon(notification.type);
    const colorClasses = getNotificationColor(notification.type);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ delay: index * 0.05 }}
        className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
          notification.read
            ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses}`}>
            <Icon className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-medium ${
                  notification.read 
                    ? 'text-gray-800 dark:text-gray-200' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {notification.message}
                </p>
                
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(notification.timestamp)}</span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                {!notification.read && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => markNotificationRead(notification.id)}
                    className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => clearNotification(notification.id)}
                  className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  title="Delete notification"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

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
            Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your learning journey
          </p>
        </div>
        
        {unreadCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllNotificationsRead}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Mark All as Read ({unreadCount})</span>
          </motion.button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Notifications</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Unread</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
            <div className="relative">
              <Bell className="w-8 h-8 text-green-200" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">This Week</p>
              <p className="text-2xl font-bold">
                {notifications.filter(n => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(n.timestamp) > weekAgo;
                }).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              All Notifications
            </h3>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.length > 0 ? (
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <div key={notification.id} className="p-6">
                  <NotificationCard notification={notification} index={index} />
                </div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No notifications yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                  When you start interacting with the platform, your notifications will appear here.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedNotifications;