/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F2F2F2',
          200: '#D9D9D9',
          300: '#808080',
          400: '#333333',
          500: ' #262626',
          600: '#1A1A1A',
          700: '#0D0D0D',
        },
        purple: {
          light: '#8284FA',
          dark: '#5E60CE',
        },
        blue: {
          light: '#4EA8DE',
          dark: '#1E6F9F',
        }
      },
      fontSize: {
        xs: ['12px', '140%'],
        sm: ['14px', '140%'],
        base: ['16px', '140%'],
      },
      fontWeight: {
        regular: '400',
        bold: '700'
      },
    },
  },
  plugins: [],
}
