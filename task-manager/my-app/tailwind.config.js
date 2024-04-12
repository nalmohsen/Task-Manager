/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        // mobile screen 
        'xs': {'min':'300px' , 'max':'691px'} ,  
      }
    },
  },
  plugins: [],
}