/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red:    { DEFAULT: '#8B1A1A', hover: '#A52020' },
        gold:   { DEFAULT: '#F5A623', hover: '#E8891A' },
        ink:    { DEFAULT: '#2D2D2D', soft: '#6B6B6B' },
        border: '#E8E4E0',
        offwhite: '#F7F5F3',
        'footer-bg': '#262626',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
