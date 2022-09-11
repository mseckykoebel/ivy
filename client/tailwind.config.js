module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 'cooper-bold': ['Cooper bold', 'serif'], }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
