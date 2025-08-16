// Local storage utilities for persistent data management

const STORAGE_KEYS = {
  USER_SKILLS: 'yolearn_user_skills',
  USER_MATCHES: 'yolearn_user_matches',
  USER_NOTIFICATIONS: 'yolearn_user_notifications',
  CURRENT_PAGE: 'yolearn_current_page',
  USER_DATA: 'yolearn_user',
  THEME: 'yolearn_theme'
};

// Generic storage functions
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to get from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
    return false;
  }
};

// Skills management
export const saveUserSkill = (skill) => {
  const existingSkills = getUserSkills();
  const newSkill = {
    ...skill,
    id: Date.now().toString(),
    dateCreated: new Date().toISOString(),
    userId: getCurrentUser()?.id
  };
  const updatedSkills = [...existingSkills, newSkill];
  return saveToStorage(STORAGE_KEYS.USER_SKILLS, updatedSkills);
};

export const getUserSkills = () => {
  return getFromStorage(STORAGE_KEYS.USER_SKILLS, []);
};

export const deleteUserSkill = (skillId) => {
  const skills = getUserSkills();
  const updatedSkills = skills.filter(skill => skill.id !== skillId);
  return saveToStorage(STORAGE_KEYS.USER_SKILLS, updatedSkills);
};

// Matches management
export const saveMatch = (match) => {
  const existingMatches = getUserMatches();
  const newMatch = {
    ...match,
    id: Date.now().toString(),
    dateCreated: new Date().toISOString()
  };
  const updatedMatches = [...existingMatches, newMatch];
  return saveToStorage(STORAGE_KEYS.USER_MATCHES, updatedMatches);
};

export const getUserMatches = () => {
  return getFromStorage(STORAGE_KEYS.USER_MATCHES, []);
};

export const updateMatchStatus = (matchId, status, additionalData = {}) => {
  const matches = getUserMatches();
  const updatedMatches = matches.map(match => 
    match.id === matchId 
      ? { ...match, status, ...additionalData, lastUpdated: new Date().toISOString() }
      : match
  );
  return saveToStorage(STORAGE_KEYS.USER_MATCHES, updatedMatches);
};

// Notifications management
export const addNotification = (notification) => {
  const existingNotifications = getUserNotifications();
  const newNotification = {
    ...notification,
    id: Date.now().toString(),
    time: new Date().toISOString(),
    read: false
  };
  const updatedNotifications = [newNotification, ...existingNotifications];
  return saveToStorage(STORAGE_KEYS.USER_NOTIFICATIONS, updatedNotifications);
};

export const getUserNotifications = () => {
  return getFromStorage(STORAGE_KEYS.USER_NOTIFICATIONS, []);
};

export const markNotificationAsRead = (notificationId) => {
  const notifications = getUserNotifications();
  const updatedNotifications = notifications.map(notification =>
    notification.id === notificationId
      ? { ...notification, read: true }
      : notification
  );
  return saveToStorage(STORAGE_KEYS.USER_NOTIFICATIONS, updatedNotifications);
};

export const markAllNotificationsAsRead = () => {
  const notifications = getUserNotifications();
  const updatedNotifications = notifications.map(notification => ({
    ...notification,
    read: true
  }));
  return saveToStorage(STORAGE_KEYS.USER_NOTIFICATIONS, updatedNotifications);
};

export const clearAllNotifications = () => {
  return saveToStorage(STORAGE_KEYS.USER_NOTIFICATIONS, []);
};

// User management
export const getCurrentUser = () => {
  return getFromStorage(STORAGE_KEYS.USER_DATA);
};

export const updateUserData = (userData) => {
  return saveToStorage(STORAGE_KEYS.USER_DATA, userData);
};

// Initialize default data if not exists
export const initializeDefaultData = () => {
  // Initialize empty arrays if they don't exist
  if (!getUserSkills().length) {
    saveToStorage(STORAGE_KEYS.USER_SKILLS, []);
  }
  if (!getUserMatches().length) {
    saveToStorage(STORAGE_KEYS.USER_MATCHES, []);
  }
  if (!getUserNotifications().length) {
    // Add some default notifications
    const defaultNotifications = [
      {
        id: 'welcome-1',
        type: 'system',
        title: 'Welcome to YoLearn!',
        message: 'Start by posting your first skill or browsing available skills',
        time: new Date().toISOString(),
        read: false,
        icon: '👋'
      }
    ];
    saveToStorage(STORAGE_KEYS.USER_NOTIFICATIONS, defaultNotifications);
  }
};

export default STORAGE_KEYS;