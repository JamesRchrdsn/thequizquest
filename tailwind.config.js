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
      keyframes: {
        success: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        error: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-5px)" },
          "40%, 80%": { transform: "translateX(5px)" },
        },
        confetti: {
          "0%": { transform: "translate(0, 0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translate(20px, -20px) rotate(90deg)",
            opacity: "0",
          },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-20%)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-10%)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-8px)" },
          "75%": { transform: "translateX(8px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "scale-confetti":
          "scale-confetti 0.3s ease-out, confetti 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        bounce: "bounce 0.5s ease-in-out",
        wiggle: "wiggle 0.3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
