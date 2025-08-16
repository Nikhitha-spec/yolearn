import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Upload, Plus, X, Star, Clock, 
  Users, Tag, Camera, Video, FileText 
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import toast from 'react-hot-toast';

const EnhancedPostSkill = () => {
  const { skillCategories, addSkill, addNotification } = useAppStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    duration: '',
    price: 'Free',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newSkill = {
        ...formData,
        instructor: 'You',
        instructorAvatar: '/api/placeholder/40/40',
        rating: 0,
        students: 0,
        id: Date.now()
      };

      addSkill(newSkill);
      
      addNotification({
        title: 'Skill Posted Successfully!',
        message: `Your skill "${formData.title}" is now live and available for other students.`,
        type: 'skill'
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        duration: '',
        price: 'Free',
        tags: []
      });

      toast.success('Your skill has been posted successfully!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Share Your Knowledge
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new skill offering and connect with eager learners
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skill Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., React Development for Beginners"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what you'll teach, what students will learn, and any prerequisites..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              required
            />
          </div>

          {/* Category and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skill Level *
              </label>
              <select
                value={formData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Duration and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 4 weeks, 10 hours"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Type
              </label>
              <select
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Free">Free</option>
                <option value="Skill Exchange">Skill Exchange</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-purple-900 dark:hover:text-purple-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTag}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Media Upload Placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Materials (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Upload images, videos, or documents
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Drag and drop files here, or click to browse
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Images</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    <span>Videos</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Documents</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Publishing Skill...</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  <span>Publish Skill</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          Tips for Success
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Clear Title:</strong> Use descriptive, searchable titles
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Detailed Description:</strong> Explain learning outcomes clearly
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Relevant Tags:</strong> Help students find your skill easily
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Set Expectations:</strong> Be honest about skill level and time commitment
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedPostSkill;