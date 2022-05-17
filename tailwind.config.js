module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
       'welcome': "url('/images/welcome/home-page.jpeg')",
      })
    }
  },
  plugins: [],
};