/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      backgroundImage: {
        'header-image': "url('src/assets/img/header.jpg')",
      }
    },
  },
  plugins: [],
}
