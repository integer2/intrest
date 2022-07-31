/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#7E57FF',
      },
      boxShadow: {
        form: '0px 4px 40px 0px #00000040;',
      },
    },
  },
  plugins: [],
};
