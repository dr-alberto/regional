/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        // https://github.com/irfanmauuu/ebook-for-everyone/blob/master/UI%20%26%20UX/Steve%20Schoger%2C%20Adam%20Wathan%20-%20Refactoring%20UI%20(2018).pdf
        // https://gist.github.com/jordienr/abb847bc1649b3259d5aec1381583fd1
        // https://coolors.co/0a2540-0d9488-98d7c2-ddffe7
        // colors: {
        //     'primary': '#0D9488',
        //     'secondary-dark': '#0A2540',
        //     'secondary-light': '#A1E5AB',
        // },
        // fontFamily: {
        //     'sans':  ['Geist']
        // }
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
  }