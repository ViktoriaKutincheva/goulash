module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      'xs': '.875rem',
      'sm': '1rem',
      'tiny': '1rem', 
      'base': '1.2rem',
      'lg': '1.325rem',
      'xl': '1.5rem',
      '2xl': '1.75rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
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
      colors: {
        chocolate: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: 'hsl(31, 22%, 52%)',
          500: 'hsl(32deg 40% 28%)',
          600: 'hsl(31, 50%, 21%)',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
