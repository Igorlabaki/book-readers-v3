module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    extend: {
      backgroundImage: theme => ({
       'welcome': "url('/images/welcome/home-page.jpeg')",
      }),
      boxShadow: {
        'pattern': '0px 4px 15px -7px #000000',
        'pattern2': '0px 1px 4px 1px #8F8F8F',
      },
      colors: {
        'primary': 'rgba(29, 53, 87)',
        'blue-md': '#1A6ED8',
        'secundary': '#cce2ff',
        'green-primary': '#8BC34A',
        'bg-gray': '#F0F2F5',
      },
    }
  },
  plugins: [],
};