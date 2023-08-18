/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'color-change': {
          '0%': { backgroundColor: '#48bb78' },
          '25%': { backgroundColor: '#ed64a6' },
          '50%': { backgroundColor: '#818cf8' },
          '75%': { backgroundColor: '#f56565' },
          '100%': { backgroundColor: '#48bb78' },
        },
      },
      animation: {
        'color-change': 'color-change 5s infinite',
      },
      dropShadow: {
        'xl': '9px 9px 9px rgba(128, 128, 128, 1)',
        'admin': '9px 9px 9px rgba(209,250, 229, 1)',
        'red': '0px 0px 9px rgba(209,0, 0, 1)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      boxShadow: {
        'green': '0px 0px 10px  rgba(209, 250, 229, 1)',
        'red': '0px 0px 10px  rgba(209, 0, 229, 1)',
        'blue': '10px 10px 99px 6px  rgba(80, 8, 196, 1)',
        'purple': '10px 10px 99px 6px  #8a46a3',
      }
    },
  },
  plugins: [require("daisyui")],
}