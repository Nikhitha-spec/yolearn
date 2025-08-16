import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockBadges } from '../data/mockData';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    department: user?.department || '',
    year: user?.year || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user data
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="campus-card p-8">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={user?.profilePhoto || 'https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg'}
              alt={user?.name}
              className="w-24 h-24 rounded-3xl border-4 border-campus-pink object-cover"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-campus-gradient rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
              📷
            </button>
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="text-2xl font-bold bg-transparent border-b-2 border-campus-pink outline-none text-campus-gray dark:text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="department"
                    value={editData.department}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Mathematics</option>
                  </select>
                  <select
                    name="year"
                    value={editData.year}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-campus-gray dark:text-white mb-2">
                  {user?.name}
                </h1>
                <p className="text-campus-purple font-medium mb-2">
                  {user?.department} • {user?.year}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {user?.bio}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>📅 Joined {new Date(user?.dateJoined).toLocaleDateString()}</span>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3 mt-4">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn-campus py-2 px-4 text-sm">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl text-sm font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-campus py-2 px-4 text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="campus-card p-6 text-center">
          <div className="text-3xl font-bold text-campus-pink mb-1">{user?.skillsCount || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Skills Posted</div>
        </div>
        <div className="campus-card p-6 text-center">
          <div className="text-3xl font-bold text-campus-purple mb-1">12</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</div>
        </div>
        <div className="campus-card p-6 text-center">
          <div className="text-3xl font-bold text-campus-blue mb-1">4.8</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
        </div>
        <div className="campus-card p-6 text-center">
          <div className="text-3xl font-bold text-campus-pink mb-1">{user?.badgesCount || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</div>
        </div>
      </div>

      {/* Badges */}
      <div className="campus-card p-6">
        <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-6">🏆 Achievements</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockBadges.slice(0, 8).map((badge) => (
            <div key={badge.id} className="text-center p-4 rounded-2xl bg-campus-gradient-soft hover:shadow-md transition-all cursor-pointer">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h3 className="font-semibold text-campus-gray dark:text-white text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Skills */}
        <div className="campus-card p-6">
          <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-6">💡 My Skills</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-campus-gradient-soft rounded-xl">
              <div>
                <h3 className="font-medium text-campus-gray dark:text-white">React Development</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Teaching • 5 students</p>
              </div>
              <div className="flex items-center text-sm text-yellow-600">
                <span>⭐ 4.9</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-campus-gradient-soft rounded-xl">
              <div>
                <h3 className="font-medium text-campus-gray dark:text-white">Data Structures</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Teaching • 3 students</p>
              </div>
              <div className="flex items-center text-sm text-yellow-600">
                <span>⭐ 4.8</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-campus-gradient-soft rounded-xl">
              <div>
                <h3 className="font-medium text-campus-gray dark:text-white">Spanish Conversation</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Learning • In progress</p>
              </div>
              <div class="text-sm text-blue-600">
                <span>📚 Learning</span>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 btn-campus py-2 text-sm">
            + Add New Skill
          </button>
        </div>

        {/* Recent Activity */}
        <div className="campus-card p-6">
          <h2 className="text-xl font-bold text-campus-gray dark:text-white mb-6">📈 Recent Activity</h2>
          
          <div className="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <span class="text-green-600 text-sm">✅</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-campus-gray dark:text-white">Completed React session with John</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <span class="text-blue-600 text-sm">🏆</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-campus-gray dark:text-white">Earned "Helpful Mentor" badge</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Yesterday</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <span class="text-purple-600 text-sm">➕</span>
              </div>
              <div class="flex-1">
                <p class="text-sm text-campus-gray dark:text-white">Posted new skill: Data Structures</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
