/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "oklch(0.955 0.006 200)",
        card: "oklch(0.995 0.002 200)",
        ink: "oklch(0.27 0.012 220)",
        "ink-soft": "oklch(0.45 0.012 220)",
        "ink-faint": "oklch(0.60 0.010 220)",
        line: "oklch(0.90 0.008 210)",
        teal: "oklch(0.52 0.082 188)",
        "teal-deep": "oklch(0.42 0.072 190)",
        "teal-tint": "oklch(0.95 0.022 190)",
        dark: "oklch(0.215 0.014 218)",
        "dark-2": "oklch(0.165 0.014 222)",
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        page: "880px",
      },
      borderRadius: {
        card: "18px",
      },
      boxShadow: {
        card:
          "0 1px 2px oklch(0.30 0.02 220 / 0.06), 0 4px 10px oklch(0.30 0.02 220 / 0.05), 0 18px 40px -14px oklch(0.35 0.03 200 / 0.18)",
      },
    },
  },
  plugins: [],
};
