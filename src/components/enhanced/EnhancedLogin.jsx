import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import useAppStore from '../../store/useAppStore';

const EnhancedLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    university: ''
  });
  
  const { setUser } = useAppStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login
      if (formData.email && formData.password) {
        const mockUser = {
          id: 1,
          name: formData.name || 'Demo User',
          email: formData.email,
          university: 'Demo University',
          avatar: '/api/placeholder/40/40',
          bio: 'Passionate learner and skill sharer',
          skills: [],
          joinedDate: new Date().toISOString()
        };
        
        setUser(mockUser);
        toast.success('Welcome back to YoLearn!');
      } else {
        toast.error('Please fill in all fields');
      }
    } else {
      // Mock signup
      if (formData.email && formData.password && formData.name && formData.university) {
        const mockUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          university: formData.university,
          avatar: '/api/placeholder/40/40',
          bio: 'New to YoLearn - excited to share and learn skills!',
          skills: [],
          joinedDate: new Date().toISOString()
        };
        
        setUser(mockUser);
        toast.success('Welcome to YoLearn! Your account has been created.');
      } else {
        toast.error('Please fill in all fields');
      }
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 999,
      name: 'Alex Demo',
      email: 'alex@demo.com',
      university: 'Demo University',
      avatar: '/api/placeholder/40/40',
      bio: 'Demo user exploring YoLearn features',
      skills: ['React Development', 'UI/UX Design'],
      joinedDate: new Date().toISOString()
    };
    
    setUser(demoUser);
    toast.success('Welcome to YoLearn Demo!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Branding */}
          <div className="lg:w-1/2 bg-gradient-to-br from-purple-700 to-pink-700 p-8 flex flex-col justify-center text-white">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <GraduationCap className="w-10 h-10 mr-3" />
                <h1 className="text-3xl font-bold">YoLearn</h1>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4">
                Enhanced Skill Exchange Platform
              </h2>
              
              <p className="text-purple-100 mb-6">
                Connect with peers, share knowledge, and grow together in our vibrant learning community.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-300 rounded-full mr-3"></div>
                  <span className="text-sm">Smart skill matching algorithm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-300 rounded-full mr-3"></div>
                  <span className="text-sm">Real-time collaboration tools</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-300 rounded-full mr-3"></div>
                  <span className="text-sm">Achievement tracking system</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <div className="lg:w-1/2 p-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'Welcome Back!' : 'Join YoLearn'}
                </h3>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to continue your learning journey' 
                    : 'Create your account to start exchanging skills'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="University/College"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all transform border"
                >
                  Try Demo Mode
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedLogin;