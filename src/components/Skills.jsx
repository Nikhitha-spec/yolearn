import React, { useState } from 'react';
import { mockSkills, categories } from '../data/mockData';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = mockSkills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesType = selectedType === 'all' || skill.type === selectedType;
    const matchesSearch = skill.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="campus-card p-6">
        <h1 className="text-3xl font-bold text-campus-gray dark:text-white mb-2">
          🔍 Browse Skills
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover amazing skills shared by your fellow students
        </p>
      </div>

      {/* Filters */}
      <div className="campus-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
              Search Skills
            </label>
            <input
              type="text"
              placeholder="Search by skill name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="teach">Teaching</option>
              <option value="learn">Learning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="campus-card p-6 hover:shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-campus-gray dark:text-white mb-1">
                  {skill.skillName}
                </h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-campus-purple font-medium">{skill.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{skill.level}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                skill.type === 'teach' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
              }`}>
                {skill.type === 'teach' ? '🏫 Teaching' : '📚 Learning'}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {skill.description}
            </p>

            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4 p-3 bg-campus-gradient-soft rounded-xl">
              <div className="w-10 h-10 bg-campus-gradient rounded-full flex items-center justify-center text-white font-bold">
                {skill.userName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-campus-gray dark:text-white text-sm">{skill.userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {skill.userDepartment} • {skill.userYear}
                </p>
              </div>
            </div>

            {/* Stats */}
            {skill.rating > 0 && (
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span>{skill.rating}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✅</span>
                  <span>{skill.sessionsCompleted} sessions</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 btn-campus py-2 text-sm">
                {skill.type === 'teach' ? 'Request to Learn' : 'Offer to Teach'}
              </button>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                💬
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No skills found</h3>
          <p className="text-gray-500 dark:text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Skills;