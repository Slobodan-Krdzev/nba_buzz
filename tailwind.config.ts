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
    },
  },
  plugins: [],
} satisfies Config;
