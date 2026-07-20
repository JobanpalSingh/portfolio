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
          glow: '#7c3aed',
          deep: '#3b0764',
        },
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(109,40,217,0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(91,33,182,0.12), transparent)',
      },
      boxShadow: {
        neon: '0 0 18px rgba(109,40,217,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)',
        card: '0 20px 60px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
};
