module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
          DEFAULT: {
            css: [
              {
                color: 'inherit',
                'h2, h3' : {
                  marginTop: '0',
                },
                'ul': {
                  paddingLeft: '',
                },
                'ul > li': { 
                  paddingLeft: '',
                },
                'ul > li::before': {
                  width: '0',
                  height: '0',
                },
                'ul > li > *:last-child': {
                  marginTop: '0', 
                  marginBottom: '0',
                },
                'ul > li > *:first-child': {
                  marginTop: '0', 
                },
              },
            ],
          },
      }, 
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
