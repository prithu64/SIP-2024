/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: "#fff",
        black: "#000",
        lightcyan: "#d1f9ff",
        lightturquoise: "#09e1ff2b",
        darkturquoise: {
          "100": "#43e9ff",
          "200": "#09e1ff",
          "300": "#11b2c8",
          "400": "#11c1ee",
          "500": "rgba(9, 225, 255, 0.2)",
        },
        cadetblue: "#10a7bb",
        dimgray: "#5d5a5a",
        gray: "#1e1e1e",
      },
      spacing: {},
      fontFamily: {
        inder: "Inder",
        inter: "Inter",
        jaldi: "Jaldi",
      },
      fontSize: {
        "5xl": "24px",
        "21xl": "40px",
        "11xl": "30px",
        lg: "18px",
        inherit: "inherit",
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.progress-bar::after': {
          content: '""',
          display: 'block',
          width: '0',
          height: '2px',
          background: '#11b2c8',
          transition: 'width .3s',
          position: 'absolute',
          left: '0',
          bottom: '0',
        },
        '.progress-bar:hover::after': {
          width: '100%',
        },
        '.btn-progress': {
          position: 'relative',
          overflow: 'hidden',
        },
        '.btn-progress::after': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          width: '0',
          height: '100%',
          backgroundColor: '#dbf9ff',
          transition: 'width .3s',
          zIndex: '-10',
        },
        '.btn-progress:hover::after': {
          width: '100%',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
  corePlugins: {
    preflight: false,
  }
}