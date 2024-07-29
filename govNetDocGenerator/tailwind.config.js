/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,vue}', // This ensures Tailwind scans your HTML, JS, and Vue files
    './public/index.html', // Add this if your main HTML file is in the public directory
 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



