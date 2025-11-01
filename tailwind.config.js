/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Default font
        nunito: ['Nunito', 'sans-serif'], 
        nosifer: ['Nosifer', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // Core colors
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        subtext: "var(--color-subtext)",
        card: "var(--color-card)",
        highlight: "var(--color-highlight)",
        border: "var(--color-border)",
        
        // Brand colors
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        
        // Accent colors
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        }
      },
    },
  },
  plugins: [],
};