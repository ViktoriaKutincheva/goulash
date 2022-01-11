module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1.2rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      typography: {
          DEFAULT: {
            css: [
              {
                fontSize: 'inherit',
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
