const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        tab: (value) => ({
          tabSize: value,
        }),
      },
      { values: theme('tabSize') },
    );
  },
  {
    theme: {
      tabSize: {
        1: '1',
        2: '2',
        4: '4',
        8: '8',
      },
    },
  },
);
