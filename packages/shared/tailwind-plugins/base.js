const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addBase }) => {
  addBase({
    html: {
      color: '#FFF',
      backgroundColor: '#000',
    },
  });
});
