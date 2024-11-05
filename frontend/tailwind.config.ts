import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        lg: "80px",
      },
      screens: {
        sm: "360px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        merienda: ['Merienda', 'cursive'],
        dancing: ['DancingScript'],
      },
      colors: {
        customGray: '#d9d9d9',
      },
    },
  },
  plugins: [],
};
export default config;
