import React from 'react';

const StatsCard = ({ title, value, change, trend, icon }) => {
  return (
    <div className="campus-card p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-campus-gray dark:text-white">{value}</p>
        </div>
        <div className="w-14 h-14 bg-campus-gradient rounded-2xl flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {trend === 'up' ? '↗️' : '↘️'} {change}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">this month</span>
      </div>
    </div>
  );
};

export default StatsCard;