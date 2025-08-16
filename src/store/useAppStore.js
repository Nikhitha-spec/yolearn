import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Skills state
      skills: [],
      userSkills: [],
      skillCategories: [
        'Programming', 'Design', 'Marketing', 'Languages', 'Music', 
        'Sports', 'Cooking', 'Photography', 'Writing', 'Mathematics',
        'Science', 'Art', 'Business', 'Finance', 'Health & Fitness'
      ],
      
      // Matches state
      matches: [],
      pendingMatches: [],
      
      // Notifications state
      notifications: [],
      unreadCount: 0,
      
      // UI state
      currentPage: 'dashboard',
      searchQuery: '',
      selectedCategory: 'All',
      isDarkMode: false,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        userSkills: [],
        matches: [],
        pendingMatches: [],
        notifications: [],
        unreadCount: 0
      }),
      
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Skills actions
      addSkill: (skill) => set((state) => ({ 
        skills: [...state.skills, { ...skill, id: Date.now() }]
      })),
      
      addUserSkill: (skill) => set((state) => ({
        userSkills: [...state.userSkills, { ...skill, id: Date.now() }]
      })),
      
      removeUserSkill: (skillId) => set((state) => ({
        userSkills: state.userSkills.filter(skill => skill.id !== skillId)
      })),
      
      updateUserSkill: (skillId, updates) => set((state) => ({
        userSkills: state.userSkills.map(skill => 
          skill.id === skillId ? { ...skill, ...updates } : skill
        )
      })),
      
      // Search and filter
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      // Matches actions
      addMatch: (match) => set((state) => ({
        matches: [...state.matches, { ...match, id: Date.now(), status: 'active' }]
      })),
      
      addPendingMatch: (match) => set((state) => ({
        pendingMatches: [...state.pendingMatches, { ...match, id: Date.now() }]
      })),
      
      acceptMatch: (matchId) => set((state) => {
        const match = state.pendingMatches.find(m => m.id === matchId);
        if (match) {
          return {
            pendingMatches: state.pendingMatches.filter(m => m.id !== matchId),
            matches: [...state.matches, { ...match, status: 'active', acceptedAt: new Date() }]
          };
        }
        return state;
      }),
      
      rejectMatch: (matchId) => set((state) => ({
        pendingMatches: state.pendingMatches.filter(m => m.id !== matchId)
      })),
      
      // Notifications actions
      addNotification: (notification) => set((state) => ({
        notifications: [{
          ...notification,
          id: Date.now(),
          timestamp: new Date(),
          read: false
        }, ...state.notifications],
        unreadCount: state.unreadCount + 1
      })),
      
      markNotificationRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      })),
      
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
      })),
      
      clearNotification: (notificationId) => set((state) => {
        const notification = state.notifications.find(n => n.id === notificationId);
        return {
          notifications: state.notifications.filter(n => n.id !== notificationId),
          unreadCount: notification && !notification.read 
            ? Math.max(0, state.unreadCount - 1) 
            : state.unreadCount
        };
      }),
      
      // Theme actions
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Initialize with mock data
      initializeData: () => {
        const mockSkills = [
          {
            id: 1,
            title: "React Development",
            description: "Learn modern React development with hooks and context",
            category: "Programming",
            level: "Intermediate",
            instructor: "Alex Johnson",
            instructorAvatar: "/api/placeholder/40/40",
            rating: 4.8,
            students: 45,
            duration: "6 weeks",
            price: "Free",
            tags: ["React", "JavaScript", "Frontend"]
          },
          {
            id: 2,
            title: "UI/UX Design Fundamentals",
            description: "Master the basics of user interface and user experience design",
            category: "Design",
            level: "Beginner",
            instructor: "Sarah Chen",
            instructorAvatar: "/api/placeholder/40/40",
            rating: 4.9,
            students: 32,
            duration: "4 weeks",
            price: "Skill Exchange",
            tags: ["UI", "UX", "Figma", "Design"]
          },
          {
            id: 3,
            title: "Spanish Conversation",
            description: "Improve your Spanish speaking skills through conversation practice",
            category: "Languages",
            level: "Intermediate",
            instructor: "Carlos Rodriguez",
            instructorAvatar: "/api/placeholder/40/40",
            rating: 4.7,
            students: 28,
            duration: "8 weeks",
            price: "Skill Exchange",
            tags: ["Spanish", "Conversation", "Language"]
          }
        ];
        
        set({ skills: mockSkills });
      }
    }),
    {
      name: 'yolearn-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userSkills: state.userSkills,
        matches: state.matches,
        notifications: state.notifications,
        isDarkMode: state.isDarkMode,
        currentPage: state.currentPage
      })
    }
  )
);

export default useAppStore;