import form from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      boxShadow: {
        green: "0 6px 16px rgba(22, 163, 74, 0.8)", //green
        blackSoft: "0 4px 10px rgba(0, 0, 0, 0.3)", // soft black
        blackHeavy: "0 6px 20px rgba(0, 0, 0, 0.6)", // stronger black
        slateGlow: "0 4px 16px rgba(100, 116, 139, 0.5)", // slate-500 glow
        slateDark: "0 6px 18px rgba(71, 85, 105, 0.7)",
      },
    },
  },
  plugins: [form],
};
