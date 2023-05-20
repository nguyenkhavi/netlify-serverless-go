const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.btnsm': {
      padding: '0 .5625rem',
      height: '1.875rem',
      columnGap: '.25rem',

      '& > svg': {
        width: '1rem',
        height: '1rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '.8125rem',
        lineHeight: '1.375rem',
        fontWeight: '700',
        letterSpacing: '0.033em',
      },
    },

    '.btnmd': {
      padding: '0 .9375rem',
      height: '2.25rem',
      columnGap: '.5rem',

      '& > svg': {
        width: '1.25rem',
        height: '1.25rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '.875rem',
        lineHeight: '1.5rem',
        fontWeight: '700',
        letterSpacing: '0.006em',
      },
    },

    '.btnlg': {
      padding: '0 1.3125rem',
      height: '2.5rem',
      columnGap: '1rem',

      '& > svg': {
        width: '1.25rem',
        height: '1.25rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '.9375rem',
        lineHeight: '1.625rem',
        fontWeight: '700',
        letterSpacing: '0.012em',
      },
    },
  });
});
