import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('yolearn_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: 1,
      name: 'Alex Johnson',
      email: email,
      department: 'Computer Science',
      year: 'Senior',
      bio: 'Passionate about web development and helping fellow students learn new skills.',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      skillsCount: 5,
      badgesCount: 8,
      dateJoined: '2024-01-15'
    };
    
    setUser(mockUser);
    localStorage.setItem('yolearn_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = async (userData) => {
    // Mock signup - in real app, this would call your API
    const newUser = {
      id: Date.now(),
      ...userData,
      skillsCount: 0,
      badgesCount: 1,
      dateJoined: new Date().toISOString().split('T')[0]
    };
    
    setUser(newUser);
    localStorage.setItem('yolearn_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yolearn_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};