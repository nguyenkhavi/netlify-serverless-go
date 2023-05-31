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

  addComponents({
    '.text-gradient-pr': {
      background:
        'linear-gradient(270deg, #3edeb5 2.7%, #47deb8 18.27%, #61dfbe 45.51%, #8ae0c9 78.59%, #a7e1d1 99.03%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  });
});
