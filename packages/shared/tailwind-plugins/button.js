const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.btn-link': {
      '&:hover': {
        boxShadow: 'inset 0 -1px currentColor',
      },
    },

    '.btnsm': {
      padding: '0 2.5625rem',
      height: '2.8125rem',
      columnGap: '.5rem',

      '& > svg': {
        width: '1.5rem',
        height: '1.5rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '.75rem',
        lineHeight: '1.375rem',
        fontWeight: '700',
      },
    },

    '.btnmd': {
      padding: '0 2.5625rem',
      height: '3.4375rem',
      columnGap: '.5rem',

      '& > svg': {
        width: '1.5rem',
        height: '1.5rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '.875rem',
        lineHeight: '1.375rem',
        fontWeight: '700',
      },
    },

    '.btnlg': {
      padding: '0 2.5625rem',
      height: '3.75rem',
      columnGap: '.5rem',

      '& > svg': {
        width: '1.5rem',
        height: '1.5rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '1rem',
        lineHeight: '1.625rem',
        fontWeight: '700',
      },
    },

    '.btnxlg': {
      padding: '0 2.5625rem',
      height: '4.0625rem',
      columnGap: '.5rem',

      '& > svg': {
        width: '1.5rem',
        height: '1.5rem',
      },

      '& > span': {
        display: 'inline-block',
        fontSize: '1.125rem',
        lineHeight: '1.625rem',
        fontWeight: '700',
      },
    },
  });
});
