/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#0f172a', // Ensure this matches the requested bg-slate-900 if it's not default, but standard tailwind has it.
        },
        cyan: {
          400: '#22d3ee', // Cyber Blue
        },
        red: {
          500: '#ef4444', // Warning Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
