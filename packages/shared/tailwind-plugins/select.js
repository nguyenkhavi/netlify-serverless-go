const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    '.select-sm': {
      height: '3.5rem',
      borderRadius: '.5rem',
    },

    '.select-md': {
      height: '4.0625rem',
      borderRadius: '.5rem',
    },
  });
});
