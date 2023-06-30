/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors:{
      'lena-hair':'#d8d9f7',
      'lena-iris':'#46315a',
      'lena-uniform':'#161654'
    },
    extend: {},
  },
  plugins: [
    require("daisyui"),
           ],
  daisyui: {
    theme: ["night", "light", "dark", "winter"]
  }
}

