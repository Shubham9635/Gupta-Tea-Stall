/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0B0B0B',
          card: '#1A1A1A',
          light: '#2A2A2A',
        },
        gold: {
          DEFAULT: '#D4A056',
          light: '#FFB84D',
          dark: '#B8862D',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'steam': 'steam 3s ease-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 86, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(212, 160, 86, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        steam: {
          '0%': { opacity: 0, transform: 'translateY(0) scale(1)' },
          '50%': { opacity: 0.6 },
          '100%': { opacity: 0, transform: 'translateY(-80px) scale(1.5)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 160, 86, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 160, 86, 0.4)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4A056 0%, #FFB84D 50%, #D4A056 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0B0B0B 0%, #1A1A1A 100%)',
      },
    },
  },
  plugins: [],
}
