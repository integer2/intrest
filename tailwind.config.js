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
        purple: {
          1: '#7E57FF',
          2: '#7E57FFB2',
          3: '#7E57FF80',
        },
        light: {
          1: '#FFFFFF',
          2: '#FFFFFFB2',
        },
        gray: {
          1: '#4A4A4A',
          2: '#A6A6A6',
          3: '#BFBFBF',
          4: '#BDBDBD',
          5: '#E5E5E5',
          6: '#F4F4F4',
        },
        dark: {
          1: '#000000',
          2: '#181818',
          3: '#262626',
          4: '#333333',
          5: '#00000059',
          6: '#00000033',
          7: '#0000000D',
          8: '#00000080',
        },
        blue: {
          1: '#0A0350',
          2: '#011F50',
          3: '#20B3D0',
          4: '#89E9FF',
        },
        red: {
          1: '#CC4747',
          2: '#D94C4C',
          3: '#F25555',
          4: '#EB5757',
          5: 'rgba(242, 85, 85, 0.6)',
          6: 'rgba(242, 85, 85, 0.2)',
        },
        multiplayer: {
          blue: '#007AFF',
          green: '#34C759',
          purple: '#5E5CE6',
          orange: '#FF9500',
          pink: '#EC407A',
          red: '#FF3B30',
          cerulen: '#36BAF5',
          gray: '#607D8B',
          turqoise: '#2EC3C2',
          lavender: '#AF52DE',
        },
        main: '#F4F4F4',
      },
      boxShadow: {
        form: '0px 4px 40px 0px #00000040',
        sidebar: '0px 0px 4px 0px #00000040',
        button: '0px 0px 1px 0px #00000040',
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
    },
  },
  plugins: [],
};
