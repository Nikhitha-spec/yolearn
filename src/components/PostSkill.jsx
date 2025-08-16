import React, { useState } from 'react';
import { categories } from '../data/mockData';
import { saveUserSkill, addNotification } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';

const PostSkill = ({ onNavigate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    skillName: '',
    category: '',
    level: '',
    type: 'teach',
    description: '',
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save skill to localStorage
    const skillData = {
      ...formData,
      userName: user?.name || 'Anonymous User',
      userDepartment: user?.department || 'Unknown',
      userYear: user?.year || 'Unknown',
      rating: 0,
      sessionsCompleted: 0
    };

    const saved = saveUserSkill(skillData);
    
    if (saved) {
      // Add notification
      addNotification({
        type: 'skill',
        title: 'Skill Posted Successfully!',
        message: `Your ${formData.type === 'teach' ? 'teaching' : 'learning'} request for "${formData.skillName}" is now live`,
        icon: formData.type === 'teach' ? '🏫' : '📚'
      });

      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        skillName: '',
        category: '',
        level: '',
        type: 'teach',
        description: '',
        tags: ''
      });

      setTimeout(() => {
        setShowSuccess(false);
        onNavigate('skills'); // Navigate to skills page after success
      }, 2000);
    } else {
      setIsSubmitting(false);
      alert('Failed to save skill. Please try again.');
    }
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-campus-gray dark:text-white mb-2">Skill Posted Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-400">Your skill has been added to the platform and is now visible to other students.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="campus-card p-6">
        <h1 className="text-3xl font-bold text-campus-gray dark:text-white mb-2">
          ➕ Post a New Skill
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your expertise or let others know what you'd like to learn
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="campus-card p-8">
        <div className="space-y-6">
          {/* Skill Type */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-3">
              What would you like to do?
            </label>
            <div className="flex space-x-4">
              <label className="flex-1">
                <input
                  type="radio"
                  name="type"
                  value="teach"
                  checked={formData.type === 'teach'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.type === 'teach'
                    ? 'border-campus-pink bg-campus-gradient-soft'
                    : 'border-gray-200 dark:border-gray-700 hover:border-campus-pink/50'
                }`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏫</div>
                    <h3 className="font-semibold text-campus-gray dark:text-white">Teach a Skill</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share your knowledge with others</p>
                  </div>
                </div>
              </label>

              <label className="flex-1">
                <input
                  type="radio"
                  name="type"
                  value="learn"
                  checked={formData.type === 'learn'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.type === 'learn'
                    ? 'border-campus-pink bg-campus-gradient-soft'
                    : 'border-gray-200 dark:border-gray-700 hover:border-campus-pink/50'
                }`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📚</div>
                    <h3 className="font-semibold text-campus-gray dark:text-white">Learn a Skill</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Find someone to teach you</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Skill Name */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              name="skillName"
              value={formData.skillName}
              onChange={handleChange}
              placeholder="e.g., React.js Development, Spanish Conversation, Guitar Basics"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
                Skill Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              >
                <option value="">Select Level</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder={formData.type === 'teach' 
                ? "Describe what you'll teach, your experience level, and what students can expect to learn..."
                : "Describe what you want to learn, your current level, and what kind of help you're looking for..."
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-2">
              Tags (Optional)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., beginner-friendly, online, weekend, project-based"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Separate tags with commas to help others find your skill
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-campus px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Posting...
                </div>
              ) : (
                `Post ${formData.type === 'teach' ? 'Teaching' : 'Learning'} Request`
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostSkill;