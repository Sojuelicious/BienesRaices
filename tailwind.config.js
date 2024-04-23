//** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        'gray-50-alpha': 'rgba(249, 250, 251, 0.75)' // Cambia los valores RGB según tu preferencia
      }
    }
  },
  plugins: []
}
