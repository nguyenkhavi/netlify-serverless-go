const basePlugin = require('./tailwind-plugins/base');
const componentsPlugin = require('./tailwind-plugins/components');
const utilitiesPlugin = require('./tailwind-plugins/utilities');
const variantsPlugin = require('./tailwind-plugins/variants');
const spacingPlugin = require('./tailwind-plugins/spacing');
const buttonPlugin = require('./tailwind-plugins/button');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      xs: '375px',
      xsm: '576px',
      sm: '640px',
      md: '768px',
      xlg: '992px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-archivo, "Archivo")', 'sans-serif'],
      },
      boxShadow: {
        'btn-default-contained': '0px 8px 16px rgba(145, 158, 171, 0.16)',
        'btn-primary-contained': '0px 8px 16px rgba(0, 171, 85, 0.24)',
      },
      fontSize: {
        h1: [
          '4rem',
          {
            lineHeight: '5rem',
            fontWeight: '700',
          },
        ],
        h2: [
          '3rem',
          {
            lineHeight: '4rem',
            fontWeight: '700',
          },
        ],
        h3: [
          '2rem',
          {
            lineHeight: '3rem',
            fontWeight: '700',
          },
        ],
        h4: [
          '1.5rem',
          {
            lineHeight: '2.25rem',
            fontWeight: '700',
          },
        ],
        h5: [
          '1.25rem',
          {
            lineHeight: '1.875rem',
            fontWeight: '700',
          },
        ],
        h6: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '700',
          },
        ],
        subtitle1: [
          '.9375rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '600',
          },
        ],
        subtitle2: [
          '.875rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '600',
          },
        ],
        body1: [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '400',
          },
        ],
        body2: [
          '.875rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '400',
          },
        ],
        caption: [
          '.75rem',
          {
            lineHeight: '1.125rem',
            fontWeight: '400',
          },
        ],
        overline: [
          '.75rem',
          {
            lineHeight: '1.125rem',
            fontWeight: '700',
          },
        ],
        btnlg: [
          '.9375rem',
          {
            lineHeight: '1.625rem',
            fontWeight: '700',
          },
        ],
        btnmd: [
          '.875rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '700',
          },
        ],
        btnsm: [
          '.8125rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '700',
          },
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#19CFA0',
          100: '#C8FACD',
          200: '#0E9A76',
          300: '#04634B',
          400: '#012622',
          500: '#007B55',
          600: '#00AB55',
        },
        secondary: {
          DEFAULT: '#0A0A0E',
          100: '#D6E4FF',
          200: '#4F4F4F',
          300: '#1B1B1C',
          400: '#000000',
        },
        info: {
          DEFAULT: '#1890FF',
          100: '#D0F2FF',
          200: '#74CAFF',
          300: '#0C53B7',
          400: '#04297A',
        },
        success: {
          DEFAULT: '#54D62C',
          100: '#E9FCD4',
          200: '#AAF27F',
          300: '#229A16',
          400: '#08660D',
        },
        warning: {
          DEFAULT: '#FFC107',
          100: '#FFF7CD',
          200: '#FFE16A',
          300: '#B78103',
          400: '#7A4F01',
        },
        error: {
          DEFAULT: '#FF4842',
          100: '#FFE7D9',
          200: '#FFA48D',
          300: '#B72136',
          400: '#7A0C2E',
        },
        grey: {
          100: '#F9FAFB',
          200: '#F4F6F8',
          300: '#DFE3E8',
          400: '#C4CDD5',
          500: '#919EAB',
          600: '#637381',
          700: '#454F5B',
          800: '#212B36',
          900: '#161C24',
        },
      },
    },
  },
  plugins: [
    basePlugin,
    componentsPlugin,
    utilitiesPlugin,
    variantsPlugin,
    spacingPlugin({ spacing: 100 }),
    buttonPlugin,
  ],
};
