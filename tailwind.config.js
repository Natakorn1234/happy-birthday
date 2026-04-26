/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-main)", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounce2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(5deg)" },
          "66%": { transform: "translateY(-8px) rotate(-5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px 5px rgba(255,100,100,0.5)" },
          "50%": { boxShadow: "0 0 40px 15px rgba(255,200,0,0.8)" },
        },
        spin3d: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        rainbowText: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
        bounce2: "bounce2 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        rainbowText: "rainbowText 2s linear infinite",
      },
    },
  },
  plugins: [],
};
