import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        accent: "#EE7709",
        accentLight: "#f29e54",
        dark: "#0b0d0c",
        titles: "#373737",
      },
      boxShadow: {
        'custom-green': '0px 0px 50.73px 0px #fff', // same as #45880078
        'custom-white-light': '0px 0px 12.73px 0px #fff', // same as #45880078
        'glow-top': '0 -20px 20px rgba(255, 255, 255, 0.9)'
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #ee7709, #2f2f2f)',
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 15s ease infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
