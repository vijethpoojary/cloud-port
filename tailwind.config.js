/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AWS Color System
        'aws-bg': {
          light: '#F2F3F3',
          lighter: '#FAFAFA',
        },
        'aws-text': {
          primary: '#16191F',
          secondary: '#5F6B7A',
        },
        'aws-orange': {
          DEFAULT: '#FF9900',
          hover: '#E68900',
          light: '#FFF4E5',
        },
        'aws-blue': {
          DEFAULT: '#0073BB',
          hover: '#005A94',
          light: '#E6F4FA',
        },
        'aws-border': {
          DEFAULT: '#D5DBDB',
          dark: '#AAB7B8',
        },
        'aws-dropdown': {
          bg: '#232F3E',
          'bg-light': '#2C3E50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      animation: {
        'slide-up': 'slideUp 0.2s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

