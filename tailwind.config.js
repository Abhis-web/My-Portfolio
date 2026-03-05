/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        ink: '#ffffff',
        muted: '#a1a1aa'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glass: '0 12px 38px rgba(0, 0, 0, 0.45)'
      }
    }
  },
  plugins: []
};
