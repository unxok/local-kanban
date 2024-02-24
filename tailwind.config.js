/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "foreground-primary": "var(--foreground-primary)",
        "foreground-secondary": "var(--foreground-secondary)",
        accent: {
          10: "hsl(var(--accent-h), var(--accent-s), 10)",
          20: "hsl(var(--accent-h), var(--accent-s), 20)",
          30: "hsl(var(--accent-h), var(--accent-s), 30)",
          40: "hsl(var(--accent-h), var(--accent-s), 40)",
          50: "hsl(var(--accent-h), var(--accent-s), 50)",
          60: "hsl(var(--accent-h), var(--accent-s), 60)",
          70: "hsl(var(--accent-h), var(--accent-s), 70)",
          80: "hsl(var(--accent-h), var(--accent-s), 80)",
          90: "hsl(var(--accent-h), var(--accent-s), 90)",
        },
      },
    },
  },
  plugins: [],
};
