module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "var(--bg-main)",
        "card-bg": "var(--card-bg)",
        "text-main": "var(--text-main)",
        "text-secondary": "var(--text-secondary)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
