const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant, e, matchVariant }) => {
  /**
   * From tailwindcss docs
   */
  addVariant('optional', '&:optional');
  addVariant('group-optional', ':merge(.group):optional &');
  addVariant('peer-optional', ':merge(.peer):optional ~ &');
  addVariant('hocus', ['&:hover', '&:focus']);
  addVariant('inverted-colors', '@media (inverted-colors: inverted)');
  matchVariant(
    'nth',
    (value) => {
      return `&:nth-child(${value})`;
    },
    {
      values: {
        1: '1',
        2: '2',
        3: '3',
      },
    },
  );

  /**
   * Custom variants
   */
  addVariant('ow', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => `.${e(`ow${separator}${className}`)}`);
  });
});
