const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    fontFamily: {
      sans: ['Kanit', 'sans-serif'],
      // sans: ['var(--font-kanit)', 'sans-serif'],
    },
    extend: {
      screens: {
        's-1440': '1440px',
      },
      colors: {
        neutral: {
          white: '#FFFFFF',
          grey: {
            background: '#F8F8F9',
          },
        },
        foundation: {
          mint: {
            blue: {
              50: '#E6FFFA',
              100: '#B0FFF0',
              200: '#8AFFE8',
              300: '#54FFDE',
              400: '#33FFD8',
              500: '#00FFCE',
              600: '#00E8BB',
              700: '#00B592',
              800: '#008C71',
              900: '#006B57',
            },
          },
          blue: {
            50: '#E6E8EC',
            100: '#B0B9C5',
            200: '#8A97A9',
            300: '#546882',
            400: '#334A69',
            500: '#001D44',
            600: '#001A3E',
            700: '#001530',
            800: '#001025',
            900: '#000C1D',
          },
          orange: {
            50: '#FEF2EA',
            100: '#FBD6BC',
            200: '#F9C29C',
            300: '#F6A76F',
            400: '#F49553',
            500: '#F17B28',
            600: '#DB7024',
            700: '#AB571C',
            800: '#854416',
            900: '#653411',
          },
          black: {
            50: '#E6E6E6',
            100: '#B0B0B0',
            200: '#8A8A8A',
            300: '#545454',
            400: '#333333',
            500: '#000000',
          },
          white: {
            50: '#FDFDFD',
            100: '#F9F9F9',
            200: '#F6F6F6',
            300: '#F2F2F2',
            400: '#F0F0F0',
            500: '#ECECEC',
            600: '#D7D7D7',
            700: '#A8A8A8',
            800: '#828282',
            900: '#636363',
          },
        },
        semantic: {
          success: {
            50: '#E7F3EB',
            100: '#B5DAC0',
            200: '#91C8A2',
            300: '#5FAF78',
            400: '#409F5D',
            500: '#108735',
            600: '#0F7B30',
            700: '#0B6026',
            800: '#094A1D',
            900: '#073916',
          },
          red: {
            50: '#FFEBEB',
            100: '#FFC0C1',
            200: '#FFA2A3',
            300: '#FF787A',
            400: '#FF5D60',
            500: '#FF3538',
            600: '#E83033',
            700: '#B52628',
            800: '#8C1D1F',
            900: '#6B1618',
          },
          yellow: {
            50: '#FCF4E6',
            100: '#F5DEB0',
            200: '#F1CE8A',
            300: '#EAB754',
            400: '#E6A933',
            500: '#E09400',
            600: '#CC8700',
            700: '#9F6900',
            800: '#7B5100',
            900: '#5E3E00',
          },
        },
        shade: {
          '02': '#18191D',
          '03': '#23262F',
        },
      },
      fontSize: {
        14: ['0.875rem', '1.5rem'],
        18: ['1.125rem', '1.5rem'],
        20: ['1.25rem', '1.5rem'],
        '24/32': ['1.5rem', '2rem'],
        '24/36': ['1.5rem', '2.25rem'],
        32: ['2rem', '3rem'],
        40: ['2.5rem', '3.75rem'],
        '48/56': ['3rem', '3.5rem'],
        '48/60': ['3rem', '3.75rem'],
        56: ['3.5rem', '4.375rem'],
        64: ['4rem', '5rem'],
        80: ['5rem', '6.25rem'],
      },
      boxShadow: {
        'button-shadow':
          '0px 0px 0px 1px rgba(0, 255, 206, 0.1), 0px 5px 10px rgba(0, 255, 206, 0.2), 0px 15px 40px rgba(0, 255, 206, 0.4)',
      },
      spacing: {
        1.5: '0.375rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '120px',
        35.5: '8.875rem',
        42: '10.5rem',
        45: '11.25rem',
        46.5: '11.625rem',
        52: '13rem',
        53: '13.25rem',
        67: '16.75rem',
        75: '18.75rem',
        89: '22.25rem',
        100: '25rem',
        108: '27rem',
        125: '31.25rem',
        160.5: '40.125rem',
        166: '41.5rem',
        189: '47.25rem',
        191: '47.75rem',
        360: '90rem',
      },
      maxWidth: {
        66: '16.5rem',
        72.5: '18.125rem',
        106: '26.5rem',
        108: '27rem',
      },
      minHeight: {
        12: '3rem',
      },
      dropShadow: {
        card: [
          '0px 5px 10px rgba(0, 255, 206, 0.2)',
          '0px 15px 40px rgba(0, 255, 206, 0.4)',
        ],
      },
      keyframes: {
        'holo-card': {
          '0%, 100%': {
            transform:
              'rotateZ(0deg) rotateX(0deg) rotateY(0deg) translate(-50%, -50%)',
          },
          '13%, 16%': {
            transform:
              'rotateZ(0deg) rotateX(-9deg) rotateY(32deg) translate(-50%, -50%)',
          },
          '35%, 38%': {
            transform:
              'rotateZ(3deg) rotateX(12deg) rotateY(20deg) translate(-50%, -50%)',
          },
          '55%': {
            transform:
              'rotateZ(-3deg) rotateX(-12deg) rotateY(-27deg) translate(-50%, -50%)',
          },
        },
      },
      animation: {
        'holo-card': 'holo-card 6s ease infinite',
      },
      backgroundImage: {
        'access-pass-border': `linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .3)),
          radial-gradient(circle, #F17B28, #00FFCE 23%, #00FFCE 48%, #F17B28 68%, #00FFCE 86%, #F17B28)`,
        'fan-pass': "url('/images/membership/fan-pass-background.webp')",
        'fan-pass-img': "url('/images/membership/fan-pass.webp')",
        'fan-pass-img-desktop':
          "url('/images/membership/fan-pass-desktop.webp')",
        'access-pass': "url('/images/membership/access-pass-background.webp')",
        'access-pass-img': "url('/images/membership/access-pass.webp')",
        'access-pass-img-desktop':
          "url('/images/membership/access-pass-desktop.webp')",
        'pre-szn': "url('/images/pre-szn/background.jpg')",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities }) {
      matchUtilities({
        rotateY: (value) => ({
          transform: `rotateY(${value}deg)`,
        }),
      });
    }),
  ],
};
