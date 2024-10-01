import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'move-top-left': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, -30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'move-top-right': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'move-bottom-left': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'move-bottom-right': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, 30px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      animation: {
        'move-top-left': 'move-top-left 2s ease-in-out infinite',
        'move-top-right': 'move-top-right 2s ease-in-out infinite',
        'move-bottom-left': 'move-bottom-left 2s ease-in-out infinite',
        'move-bottom-right': 'move-bottom-right 2s ease-in-out infinite',
      },
      backgroundImage: {
        "login-bg": "url('/img/login-bg.png')",
      },
    },
  },
  plugins: [],
};
export default config;
