/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: '#07060f',
        violet: {
          glow: '#a855f7',
          deep: '#4c1d95',
        },
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168,85,247,0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(139,92,246,0.2), transparent)',
      },
      boxShadow: {
        neon: '0 0 22px rgba(168,85,247,0.14), inset 0 0 0 1px rgba(255,255,255,0.04)',
        card: '0 20px 60px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
};
