const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.scrollbar-hide::-webkit-scrollbar': {
      display: 'none',
    },
    '.scrollbar-hide': {
      scrollbarWidth: 'none',
      MsOverflowStyle: 'none',
    },
  });
});
