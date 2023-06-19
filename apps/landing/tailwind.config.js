const { join } = require('path');
const sharedConfig = require('../../packages/shared/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).tsx'),
    join(__dirname, '../../packages/shared/src/**/*!(*.stories|*.spec).tsx'),
  ],
};
