import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, Clock, Users, BookOpen, 
  Heart, Share2, Play, Award, ChevronDown 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { useSkillFilters } from '../../hooks/useSearch';

const EnhancedSkills = () => {
  const { 
    skills, 
    skillCategories, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    addMatch,
    addNotification
  } = useAppStore();

  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPriceType, setSelectedPriceType] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSkills = useSkillFilters(skills, {
    searchQuery,
    selectedCategory,
    level: selectedLevel,
    priceType: selectedPriceType
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'newest':
        return b.id - a.id;
      default:
        return b.students - a.students;
    }
  });

  const handleEnrollSkill = (skill) => {
    addMatch({
      skillId: skill.id,
      skillTitle: skill.title,
      instructorName: skill.instructor,
      instructorAvatar: skill.instructorAvatar,
      type: 'learning',
      status: 'pending'
    });

    addNotification({
      title: 'Enrollment Request Sent',
      message: `Your request to learn "${skill.title}" has been sent to ${skill.instructor}.`,
      type: 'match'
    });
  };

  const SkillCard = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Skill Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            skill.level === 'Beginner' 
              ? 'bg-green-100 text-green-800'
              : skill.level === 'Intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {skill.level}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {skill.title}
          </h3>
        </div>
      </div>

      {/* Skill Content */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={skill.instructorAvatar}
            alt={skill.instructor}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {skill.instructor}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Instructor
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {skill.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.rating}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {skill.students}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {skill.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {skill.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right">
            <p className={`font-semibold ${
              skill.price === 'Free' 
                ? 'text-green-600' 
                : 'text-purple-600'
            }`}>
              {skill.price}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleEnrollSkill(skill)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Enroll</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Discover Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore {skills.length} amazing skills from talented peers
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for skills, instructors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="All">All Categories</option>
                  {skillCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price
                </label>
                <select
                  value={selectedPriceType}
                  onChange={(e) => setSelectedPriceType(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="All">All Types</option>
                  <option value="Free">Free</option>
                  <option value="Exchange">Skill Exchange</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Showing {sortedSkills.length} of {skills.length} skills
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
          <button className="p-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sortedSkills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </motion.div>

      {/* Empty State */}
      {sortedSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No skills found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSelectedPriceType('All');
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedSkills;