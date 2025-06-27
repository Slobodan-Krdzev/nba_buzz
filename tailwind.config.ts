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

        accent: "#c39f3f",
        accentLight: "#f0e7d6",
        dark: "#0b0d0c",
        titles: "#373737",
      },
      boxShadow: {
        'custom-green': '0px 0px 50.73px 0px #fff', // same as #45880078
      },
    },
  },
  plugins: [],
} satisfies Config;
