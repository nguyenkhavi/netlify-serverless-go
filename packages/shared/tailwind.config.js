const basePlugin = require('./tailwind-plugins/base');
const componentsPlugin = require('./tailwind-plugins/components');
const utilitiesPlugin = require('./tailwind-plugins/utilities');
const variantsPlugin = require('./tailwind-plugins/variants');
const spacingPlugin = require('./tailwind-plugins/spacing');
const buttonPlugin = require('./tailwind-plugins/button');
const inputPlugin = require('./tailwind-plugins/input');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}')],
  theme: {
    screens: {
      xs: '375px',
      xsm: '576px',
      sm: '640px',
      md: '768px',
      's-924': '924px',
      xlg: '992px',
      lg: '1024px',
      's-1036': '1036px',
      's-1117': '1117px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-archivo, "Archivo")', 'sans-serif'],
      },
      zIndex: {
        'under-sticky': 9,
        sticky: 10,
        dropdown: 20,
        overlay: 100,
        toast: 1000,
        tooltip: 1000,
      },
      dropShadow: {
        btn: '0px 0px 10px #19CA9B',
      },
      backgroundImage: {
        btn: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
        'footer-mobile': 'linear-gradient(180deg, #0A1512 0%, #000000 100%)',
        'footer-desktop': 'linear-gradient(180deg, #000000 0%, #0D1B17 99.18%)',
        achievement: 'linear-gradient(90.3deg, #000000 1.9%, #081A15 99.83%)',
        'welcome-mobile': "url('/images/home/welcome-mobile.webp')",
        'welcome-desktop': "url('/images/home/welcome-desktop.webp')",
        'banner-bg': "url('/images/marketplace/banner-bg.png')",
        'main-gradient':
          'linear-gradient(270deg, #3edeb5 2.7%, #47deb8 18.27%,#61dfbe 45.51%, #8ae0c9 78.59%, #a7e1d1 99.03%)',
        'icon-gradient':
          'linear-gradient(90deg, #3EDEB5 0%, #47DEB8 15.99%, #61DFBE 43.97%, #8AE0C9 77.95%, #A7E1D1 98.94%)',
      },
      keyframes: {
        'slide-left': {
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'slide-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'slide-left': 'slide-left 10s linear infinite',
        'slide-right': 'slide-right 10s linear infinite',
        'spin-ring': 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
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
            fontWeight: '400',
          },
        ],
        'h5-bold': [
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
            fontWeight: '500',
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
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '500',
          },
        ],
        body3: [
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
            fontWeight: '400',
          },
        ],
        underline: [
          '.875rem',
          {
            lineHeight: '1.125rem',
            fontWeight: '500',
          },
        ],
        btnexlg: [
          '1.125rem',
          {
            lineHeight: '1.625rem',
            fontWeight: '700',
          },
        ],
        btnlg: [
          '1rem',
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
          '.75rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '700',
          },
        ],
        btndefault: [
          '1rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '500',
          },
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#19CFA0',
          100: '#1AF9BE',
          200: '#66F5CF',
          300: '#7BFFDC',
          400: '#92FEE1',
          500: '#B1FDE9',
          600: '#E0FBF4',
          700: '#FFFFFF',

          shade: {
            DEFAULT: '#19CFA0',
            100: '#04A87D',
            200: '#028F6A',
            300: '#026E51',
            400: '#0E5542',
            500: '#023528',
            600: '#0D1B17',
            700: '#050B0A',
          },
        },
        secondary: {
          DEFAULT: '#000000',
          100: '#0A0A0E',
          200: '#0D0D0D',
          300: '#121212',
          400: '#313130',
          500: '#545453',
          600: '#717171',
          700: '#CAC9C8',
        },
        info: {
          DEFAULT: '#2F80ED',
        },
        success: {
          DEFAULT: '#33B469',
        },
        warning: {
          DEFAULT: '#EBBC2E',
        },
        error: {
          DEFAULT: '#E02222',
        },
        grey: {
          100: '#A7A7A7',
          200: '#BEBEBE',
          300: '#CFCFCF',
          400: '#E3E3E3',
        },
        text: {
          DEFAULT: '#0A0A0E',
          10: '#2F3339',
          20: '#46494F',
          30: '#5D6165',
          50: '#8B8E92',
          60: '#A2A4A7',
          70: '#B9BABD',
          80: '#D0D2D3',
          100: '#FFFFFF',
        },
        header: {
          bg: '#121212',
        },
      },
    },
  },
  plugins: [
    basePlugin,
    componentsPlugin,
    utilitiesPlugin,
    variantsPlugin,
    spacingPlugin({ spacing: 200 }),
    buttonPlugin,
    inputPlugin,
  ],
};
