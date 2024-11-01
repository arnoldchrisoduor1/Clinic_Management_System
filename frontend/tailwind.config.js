/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        lg: "80px",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        merienda: ['Merienda', 'outline'],
        dancing: ['DancingScript'],
        dancingsemibold: ['DancingScriptSemiBold'],
      },
      colors: {
      customGray: '#d9d9d9',
    },
    },
  },
  plugins: [],
}