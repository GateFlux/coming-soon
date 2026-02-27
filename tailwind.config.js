/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1c153e',
          50: '#f5f4f7',
          100: '#e8e6ed',
          200: '#c9c5d4',
          300: '#aaa3bb',
          400: '#6c6089',
          500: '#3d335f',
          600: '#2a234b',
          700: '#1c153e',
          800: '#150f30',
          900: '#0e0a22',
        },
        accent: {
          DEFAULT: '#d78310',
          50: '#fef8e6',
          100: '#fdecc0',
          200: '#fbd986',
          300: '#f8c24a',
          400: '#eca61e',
          500: '#d78310',
          600: '#b5680c',
          700: '#8f4f0b',
          800: '#6b3a0a',
          900: '#4a2908',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
}
