const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.hidden-scrollbar::-webkit-scrollbar': {
      display: 'none',
    },
    '.hidden-scrollbar': {
      scrollbarWidth: 'none',
      MsOverflowStyle: 'none',
    },
  });
});
