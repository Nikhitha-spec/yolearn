import React, { useEffect, useState } from 'react';
import StatsCard from './StatsCard';
import { mockStats, mockSkills, mockLeaderboard, categories } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { getUserSkills, getUserMatches, getUserNotifications, initializeDefaultData } from '../utils/storage';

const Dashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState(mockStats);

  useEffect(() => {
    // Initialize default data
    initializeDefaultData();
    
    // Calculate real user stats
    const userSkills = getUserSkills();
    const userMatches = getUserMatches();
    
    setUserStats({
      activeSkills: userSkills.length,
      successfulMatches: userMatches.filter(m => m.status === 'completed').length,
      studentsHelped: userMatches.filter(m => m.status === 'completed' && m.teacherName === user?.name).length,
      avgRating: userMatches.length > 0 ? 4.8 : 0
    });
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="campus-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-campus-gray dark:text-white mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to learn something new or share your expertise today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-campus-gradient rounded-3xl flex items-center justify-center float-animation">
              <span className="text-4xl">🎓</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Skills & Categories */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Skills */}
          <div className="campus-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-campus-gray dark:text-white">🔥 Trending Skills</h2>
              <button className="text-campus-purple hover:text-campus-pink font-medium text-sm">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {mockSkills.slice(0, 3).map((skill) => (
                <div key={skill.id} className="bg-campus-gradient-soft p-4 rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-campus-gray dark:text-white">{skill.skillName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{skill.category} • {skill.level}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      skill.type === 'teach' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {skill.type === 'teach' ? '🏫 Teaching' : '📚 Learning'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{skill.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>👤 {skill.userName}</span>
                      <span>🏛️ {skill.userDepartment}</span>
                      {skill.rating > 0 && <span>⭐ {skill.rating}</span>}
                    </div>
                    <button className="btn-campus py-1 px-4 text-xs">
                      {skill.type === 'teach' ? 'Learn' : 'Teach'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Categories */}
          <div className="campus-card p-6">
            <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-6">📚 Popular Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <div key={category.name} className="text-center p-4 rounded-2xl bg-campus-gradient-soft hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-campus-gray dark:text-white text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{category.count} skills</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="campus-card p-6">
            <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-4">⚡ Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full btn-campus py-3 text-left flex items-center">
                <span className="mr-3">➕</span>
                Post New Skill
              </button>
              <button className="w-full bg-campus-gradient-soft text-campus-gray dark:text-white py-3 px-4 rounded-2xl text-left flex items-center hover:shadow-md transition-all">
                <span className="mr-3">🔍</span>
                Find Learning Partner
              </button>
              <button className="w-full bg-campus-gradient-soft text-campus-gray dark:text-white py-3 px-4 rounded-2xl text-left flex items-center hover:shadow-md transition-all">
                <span className="mr-3">📅</span>
                Schedule Session
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="campus-card p-6">
            <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-4">🏆 Top Contributors</h2>
            
            <div className="space-y-3">
              {mockLeaderboard.map((leader) => (
                <div key={leader.rank} className="flex items-center justify-between p-3 rounded-2xl bg-campus-gradient-soft">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{leader.badge}</span>
                    <div>
                      <p className="font-medium text-campus-gray dark:text-white text-sm">{leader.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{leader.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-campus-purple">{leader.points}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Preview */}
          <div className="campus-card p-6">
            <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-4">🎖️ Recent Badges</h2>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-2xl bg-campus-gradient-soft">
                <div className="text-2xl mb-1">🎯</div>
                <p className="text-xs font-medium text-campus-gray dark:text-white">First Match</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-campus-gradient-soft">
                <div className="text-2xl mb-1">⚡</div>
                <p className="text-xs font-medium text-campus-gray dark:text-white">Quick Learner</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-campus-gradient-soft">
                <div className="text-2xl mb-1">🌟</div>
                <p className="text-xs font-medium text-campus-gray dark:text-white">Rising Star</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;