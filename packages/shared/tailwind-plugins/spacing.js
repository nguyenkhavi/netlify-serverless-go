const plugin = require('tailwindcss/plugin');

function getSpacingUtilities(input) {
  return {
    px: '0.0625rem',
    0: '0rem',
    ...Array(input * 4)
      .fill(0)
      .map((_, i) => i + 1)
      .reduce((acc, i) => {
        acc[i / 4] = i / 16 + 'rem';
        return acc;
      }, {}),
  };
}

function checkForValidSpacingInput(input) {
  if (typeof input === 'number') return;
  throw new Error('The Spacing Plugin expects a `spacing` option passed to it, which is a number.');
}

module.exports = plugin.withOptions(
  () => () => {},
  (options) => {
    const { spacing } = options;
    checkForValidSpacingInput(spacing);
    return {
      theme: {
        spacing: getSpacingUtilities(spacing),
      },
    };
  },
);
