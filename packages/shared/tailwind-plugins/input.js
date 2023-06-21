const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    '.input-sm': {
      height: '3.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '.5rem',
      fontSize: '.875rem',
      lineHeight: '1.375rem',

      '&.input-password': {
        paddingRight: '3.5rem',
        '& ~ svg': {
          cursor: 'pointer',
          userSelect: 'none',
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          color: theme('colors.text.20'),
          '&:hover': {
            color: theme('colors.text.50'),
          },
        },
      },
    },

    '.input-md': {
      height: '4.0625rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '.5rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',

      '&.input-password': {
        paddingRight: '4.625rem',
        '& ~ svg': {
          cursor: 'pointer',
          userSelect: 'none',
          position: 'absolute',
          top: '50%',
          right: '1.5625rem',
          transform: 'translateY(-50%)',
          color: theme('colors.text.20'),
          '&:hover': {
            color: theme('colors.text.50'),
          },
        },
      },
    },

    '.textarea-sm': {
      height: '16.1875rem',
      padding: '.5rem 1rem',
      borderRadius: '.5rem',
      resize: 'vertical',
    },

    '.textarea-md': {
      height: '6.5625rem',
      padding: '.5rem 1rem',
      borderRadius: '.5rem',
      resize: 'vertical',
    },
  });
});
