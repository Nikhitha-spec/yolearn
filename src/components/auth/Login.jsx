import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    year: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const departments = [
    'Computer Science', 'Engineering', 'Business', 'Mathematics', 
    'Literature', 'Music', 'Art & Design', 'Biology', 'Chemistry', 'Physics'
  ];

  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  return (
    <div className="min-h-screen bg-campus-gradient-soft dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-campus-gradient rounded-3xl mb-4 float-animation">
            <span className="text-3xl font-bold text-white">Y</span>
          </div>
          <h1 className="text-4xl font-bold text-campus-gray dark:text-white mb-2">
            YoLearn
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Campus Skill Exchange Platform
          </p>
        </div>

        {/* Login/Signup Form */}
        <div className="campus-card p-8">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-l-full font-medium transition-all ${
                isLogin 
                  ? 'bg-campus-gradient text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-r-full font-medium transition-all ${
                !isLogin 
                  ? 'bg-campus-gradient text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your college email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-1">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required={!isLogin}
                    >
                      <option value="">Select</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-1">
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      required={!isLogin}
                    >
                      <option value="">Select</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-campus-gray dark:text-gray-300 mb-1">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-campus-pink focus:ring-2 focus:ring-campus-pink/20 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-campus py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-campus-purple font-medium hover:underline"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🎓 Connect • Learn • Grow • Share Skills
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;