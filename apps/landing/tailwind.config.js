const { join } = require('path');
const sharedConfig = require('../../packages/shared/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../../packages/shared/src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
  ],
};
