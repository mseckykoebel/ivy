module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cooper-bold': ['Cooper bold', 'serif'],
        'atkinson': ['Atkinson'],
        'atkinson-bold': ['Atkinson bold'],
        'atkinson-italic': ['Atkinson italic']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
