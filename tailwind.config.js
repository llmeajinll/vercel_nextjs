/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        flamenco: ['flamenco'],
        noto_regular: ['noto_regular'],
        noto_medium: ['noto_medium'],
      },
    },
    screens: {
      mobile: '480px',
      tablet: '768px',
      pc: '1240px',
    },
  },
  plugins: [],
};
