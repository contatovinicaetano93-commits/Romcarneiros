import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        olive: {
          DEFAULT: "var(--olive)",
          deep: "var(--olive-deep)",
          soft: "var(--olive-soft)",
        },
        greige: "var(--greige)",
        beige: {
          DEFAULT: "var(--beige)",
          deep: "var(--beige-deep)",
        },
        "ink-soft": "var(--ink-soft)",
        sea: "var(--sea)",
        "sea-deep": "var(--sea-deep)",
        lagoon: "var(--lagoon)",
        sand: "var(--sand)",
        "sand-light": "var(--sand-light)",
        palm: "var(--palm)",
        ink: "var(--ink)",
        foam: "var(--foam)",
        mist: "var(--mist)",
        coral: "var(--coral)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
