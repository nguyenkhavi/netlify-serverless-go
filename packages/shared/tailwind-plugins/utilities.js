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
    matchUtilities({
      'animation-delay': (value) => ({
        animationDelay: value,
      }),
    });
    matchUtilities(
      {
        'dot-para': (value) => ({
          display: '-webkit-box',
          '-webkitLineClamp': value,
          '-webkitBoxOrient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }),
      },
      { values: theme('dotRow') },
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
      dotRow: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
      },
    },
  },
);
