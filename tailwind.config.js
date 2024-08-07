module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'mGreen': '#006A32',
        'mRed': '#F00925',
        'mYellow': '#FCD12A'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
};
