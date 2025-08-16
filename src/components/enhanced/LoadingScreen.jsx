import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">YL</span>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-6"
        />
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
        >
          Loading YoLearn
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Preparing your skill exchange platform...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;