import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { user } = useAuth();
  
  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      emoji: '🏠'
    },
    { 
      id: 'skills', 
      name: 'Browse Skills', 
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      emoji: '🔍'
    },
    { 
      id: 'post-skill', 
      name: 'Post Skill', 
      icon: 'M12 4v16m8-8H4',
      emoji: '➕'
    },
    { 
      id: 'matches', 
      name: 'My Matches', 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      emoji: '🤝'
    },
    { 
      id: 'profile', 
      name: 'My Profile', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      emoji: '👤'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      emoji: '🔔'
    }
  ];

  return (
    <aside className="bg-white dark:bg-gray-800 shadow-sm w-64 hidden md:block border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* User Quick Info */}
        <div className="mb-8">
          <div className="campus-card p-4 text-center">
            <img
              src={user?.profilePhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
              className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-campus-pink object-cover"
            />
            <h3 className="font-semibold text-campus-gray dark:text-white text-sm">{user?.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{user?.department} • {user?.year}</p>
            
            <div className="flex justify-around text-xs">
              <div className="text-center">
                <div className="font-semibold text-campus-purple">{user?.skillsCount || 0}</div>
                <div className="text-gray-500">Skills</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-campus-blue">{user?.badgesCount || 0}</div>
                <div className="text-gray-500">Badges</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-2xl transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-campus-gradient text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-campus-gradient-soft hover:scale-102'
                  }`}
                >
                  <span className="text-lg mr-3">{item.emoji}</span>
                  <span className="font-medium">{item.name}</span>
                  {currentPage === item.id && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="campus-card p-4">
            <h4 className="font-semibold text-campus-gray dark:text-white text-sm mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage('post-skill')}
                className="w-full btn-campus py-2 text-sm"
              >
                ➕ Post New Skill
              </button>
              <button
                onClick={() => setCurrentPage('skills')}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                🔍 Find Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;