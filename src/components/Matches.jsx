import React, { useState } from 'react';
import { mockMatches } from '../data/mockData';

const Matches = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredMatches = () => {
    if (activeTab === 'all') return mockMatches;
    return mockMatches.filter(match => match.status === activeTab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'all', name: 'All Matches', count: mockMatches.length },
    { id: 'pending', name: 'Pending', count: mockMatches.filter(m => m.status === 'pending').length },
    { id: 'accepted', name: 'Accepted', count: mockMatches.filter(m => m.status === 'accepted').length },
    { id: 'completed', name: 'Completed', count: mockMatches.filter(m => m.status === 'completed').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="campus-card p-6">
        <h1 className="text-3xl font-bold text-campus-gray dark:text-white mb-2">
          🤝 My Matches
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your skill exchange connections and sessions
        </p>
      </div>

      {/* Tabs */}
      <div className="campus-card p-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-campus-gradient text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-campus-gray dark:hover:text-white'
              }`}
            >
              {tab.name}
              <span className="ml-2 text-xs opacity-75">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {getFilteredMatches().map((match) => (
          <div key={match.id} className="campus-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-campus-gradient rounded-2xl flex items-center justify-center text-white font-bold">
                  {match.teacherName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-campus-gray dark:text-white mb-1">
                    {match.skillName}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>👨‍🏫 {match.teacherName}</span>
                    <span>•</span>
                    <span>👨‍🎓 {match.learnerName}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Message */}
            {match.message && (
              <div className="bg-campus-gradient-soft p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "{match.message}"
                </p>
              </div>
            )}

            {/* Scheduled Date */}
            {match.scheduledDate && (
              <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span>📅</span>
                <span>Scheduled for: {new Date(match.scheduledDate).toLocaleDateString()}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              {match.status === 'pending' && (
                <>
                  <button className="btn-campus py-2 px-4 text-sm">
                    Accept
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Decline
                  </button>
                </>
              )}
              
              {match.status === 'accepted' && (
                <>
                  <button className="btn-campus py-2 px-4 text-sm">
                    📅 Schedule Session
                  </button>
                  <button className="bg-campus-gradient-soft text-campus-gray dark:text-white py-2 px-4 rounded-xl text-sm font-medium hover:shadow-md transition-all">
                    💬 Message
                  </button>
                </>
              )}
              
              {match.status === 'completed' && (
                <button className="btn-campus py-2 px-4 text-sm">
                  ⭐ Rate & Review
                </button>
              )}
              
              <button className="bg-campus-gradient-soft text-campus-gray dark:text-white py-2 px-4 rounded-xl text-sm font-medium hover:shadow-md transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {getFilteredMatches().length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No matches found</h3>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            {activeTab === 'all' 
              ? "You haven't been matched with anyone yet. Try browsing skills to find learning opportunities!"
              : `No ${activeTab} matches at the moment.`
            }
          </p>
          <button className="btn-campus py-2 px-6">Browse Skills</button>
        </div>
      )}
    </div>
  );
};

export default Matches;