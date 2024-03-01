module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'mGreen': '#119C6F',
        'mRed': '#F00925'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
