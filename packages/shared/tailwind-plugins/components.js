const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.hidden-scrollbar::-webkit-scrollbar': {
      display: 'none',
    },
    '.hidden-scrollbar': {
      scrollbarWidth: 'none',
      MsOverflowStyle: 'none',
    },
  });

  addComponents({
    '.text-gradient-pr': {
      background:
        'linear-gradient(270deg, #3edeb5 2.7%, #47deb8 18.27%, #61dfbe 45.51%, #8ae0c9 78.59%, #a7e1d1 99.03%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    '.text-gradient-secondary': {
      background:
        'linear-gradient(270deg, #3edeb5 0%, #47deb8 16%, #61dfbe 44%, #8ae0c9 78%, #a7e1d1 99%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    '.text-green-gradient': {
      background:
        'linear-gradient(90deg, #B2F2E1 -0.29%, #BBF4E5 20.77%, #D5F8EF 54.86%, #FEFFFF 97.97%, #FFFFFF 98.97%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    '.border-green-gradient': {
      border: '2px solid transparent',
      borderRadius: '15px',
      // borderImage:
      //   'linear-gradient(90deg, #3EDEB5 0%, #47DEB8 16%, #61DFBE 44%, #8AE0C9 78%, #A7E1D1 99%) 1',
      background:
        'linear-gradient(theme(colors.secondary.200), theme(colors.secondary.200)) padding-box, linear-gradient(90deg, #3EDEB5 0%, #47DEB8 16%, #61DFBE 44%, #8AE0C9 78%, #A7E1D1 99%) border-box',
    },
    '.check-gradient': {
      background:
        'linear-gradient(90deg, #3EDEB5 0%, #47DEB8 16%, #61DFBE 44%, #8AE0C9 78%, #A7E1D1 99%)',
      boxShadow: '0px 0px 10px #19CA9B',
    },
  });
});
