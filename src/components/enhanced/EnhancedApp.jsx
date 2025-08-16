import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import EnhancedHeader from './EnhancedHeader';
import EnhancedSidebar from './EnhancedSidebar';
import EnhancedDashboard from './EnhancedDashboard';
import EnhancedLogin from './EnhancedLogin';
import EnhancedProfile from './EnhancedProfile';
import EnhancedSkills from './EnhancedSkills';
import EnhancedMatches from './EnhancedMatches';
import EnhancedNotifications from './EnhancedNotifications';
import EnhancedPostSkill from './EnhancedPostSkill';
import LoadingScreen from './LoadingScreen';

function EnhancedApp() {
  const { 
    isAuthenticated, 
    isDarkMode, 
    initializeData,
    user
  } = useAppStore();

  useEffect(() => {
    // Initialize mock data on app start
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!isAuthenticated) {
    return (
      <>
        <EnhancedLogin />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#374151',
            }
          }}
        />
      </>
    );
  }

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
      }`}>
        <EnhancedHeader />
        <div className="flex">
          <EnhancedSidebar />
          <main className="flex-1 ml-64 pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<EnhancedDashboard />} />
                  <Route path="/skills" element={<EnhancedSkills />} />
                  <Route path="/post-skill" element={<EnhancedPostSkill />} />
                  <Route path="/matches" element={<EnhancedMatches />} />
                  <Route path="/profile" element={<EnhancedProfile />} />
                  <Route path="/notifications" element={<EnhancedNotifications />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#374151',
              border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
            }
          }}
        />
      </div>
    </Router>
  );
}

export default EnhancedApp;