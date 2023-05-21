const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--max-bound': '90rem',
      '--site-padding': '1rem',
      '--header-height': '5rem',
      '--primary-color': '#FFF',
      '--background-color': '#000',
      '--content-width': `min(
        calc(100vw - 2 * var(--site-padding)),
        calc(var(--max-bound) - 2 * var(--site-padding))
      )`,
      '--px': 'calc((100vw - var(--content-width)) / 2)',

      '@screen xsm': {
        '--site-padding': '1.5rem',
      },

      '@screen xlg': {
        '--site-padding': '2.5rem',
      },

      '@screen xl': {
        '--site-padding': '3.75rem',
      },
    },
  });

  addBase({
    '*, ::before, ::after': {
      borderColor: 'var(--primary-color)',
    },

    html: {
      color: 'var(--primary-color)',
      backgroundColor: 'var(--background-color)',
    },

    span: {
      display: 'inline-block',
    },
  });
});
