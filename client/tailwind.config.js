/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./src/**/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            'sans':  ['Geist']
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
  }