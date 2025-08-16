import React, { useState } from 'react';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'match',
      title: 'New Match Request',
      message: 'Sarah Chen wants to learn React Development from you',
      time: '5 minutes ago',
      read: false,
      icon: '🤝'
    },
    {
      id: 2,
      type: 'session',
      title: 'Session Reminder',
      message: 'You have a Spanish lesson with Carlos in 1 hour',
      time: '1 hour ago',
      read: false,
      icon: '⏰'
    },
    {
      id: 3,
      type: 'badge',
      title: 'New Badge Earned!',
      message: 'Congratulations! You earned the "Quick Learner" badge',
      time: '2 hours ago',
      read: true,
      icon: '🏆'
    },
    {
      id: 4,
      type: 'rating',
      title: 'New Rating Received',
      message: 'John rated your React session 5 stars',
      time: '1 day ago',
      read: true,
      icon: '⭐'
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'Emma sent you a message about guitar lessons',
      time: '2 days ago',
      read: true,
      icon: '💬'
    }
  ]);

  const getNotificationColor = (type, read) => {
    if (read) return 'bg-gray-50 dark:bg-gray-800/50';
    
    switch (type) {
      case 'match':
        return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-campus-blue';
      case 'session':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400';
      case 'badge':
        return 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-campus-purple';
      case 'rating':
        return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400';
      case 'message':
        return 'bg-pink-50 dark:bg-pink-900/20 border-l-4 border-campus-pink';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="campus-card p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-campus-gray dark:text-white mb-2">
              🔔 Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with your YoLearn activities
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="text-right">
              <div className="w-12 h-12 bg-campus-gradient rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                {unreadCount}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">unread</p>
            </div>
          )}
        </div>
      </div>

      {/* Notification Actions */}
      <div className="campus-card p-4">
        <div className="flex space-x-3">
          <button className="btn-campus py-2 px-4 text-sm">
            Mark All as Read
          </button>
          <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Clear All
          </button>
          <button className="bg-campus-gradient-soft text-campus-gray dark:text-white py-2 px-4 rounded-xl text-sm font-medium hover:shadow-md transition-all">
            Notification Settings
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-6 rounded-2xl transition-all hover:shadow-md cursor-pointer ${getNotificationColor(notification.type, notification.read)}`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-campus-gradient rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                {notification.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-campus-gray dark:text-white'}`}>
                    {notification.title}
                    {!notification.read && (
                      <span className="ml-2 w-2 h-2 bg-campus-pink rounded-full inline-block"></span>
                    )}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {notification.time}
                  </span>
                </div>
                
                <p className={`text-sm ${notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {notification.message}
                </p>
                
                {/* Action buttons for specific notification types */}
                {notification.type === 'match' && !notification.read && (
                  <div className="flex space-x-2 mt-3">
                    <button className="btn-campus py-1 px-3 text-xs">
                      Accept
                    </button>
                    <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-lg text-xs font-medium">
                      Decline
                    </button>
                  </div>
                )}
                
                {notification.type === 'session' && !notification.read && (
                  <div className="flex space-x-2 mt-3">
                    <button className="btn-campus py-1 px-3 text-xs">
                      View Details
                    </button>
                    <button className="bg-campus-gradient-soft text-campus-gray dark:text-white py-1 px-3 rounded-lg text-xs font-medium">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No notifications</h3>
          <p className="text-gray-500 dark:text-gray-500">You're all caught up! Check back later for updates.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;