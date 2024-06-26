import {nextui} from '@nextui-org/theme'
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#fe41f0',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],daisyui, 
}
