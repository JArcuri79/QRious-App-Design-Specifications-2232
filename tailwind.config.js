/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#87CEEB',
        'electric-blue': '#00c6ff',
        'deep-blue': '#0072ff',
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-border': '#333333',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #87CEEB 0%, #00c6ff 100%)',
        'electric-gradient': 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      },
      boxShadow: {
        'electric': '0 0 20px rgba(0, 198, 255, 0.3)',
        'electric-strong': '0 0 30px rgba(0, 198, 255, 0.5)',
      },
    },
  },
  plugins: [],
}