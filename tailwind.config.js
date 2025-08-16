/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'campus-pink': '#F48FB1',
        'campus-purple': '#BA68C8',
        'campus-blue': '#64B5F6',
        'campus-gray': '#2D3748',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'campus-gradient': 'linear-gradient(135deg, #F48FB1, #BA68C8, #64B5F6)',
        'campus-gradient-soft': 'linear-gradient(135deg, rgba(244,143,177,0.1), rgba(186,104,200,0.1), rgba(100,181,246,0.1))',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
