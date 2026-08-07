/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: { deep: '#050A1E', mid: '#0C1240', surface: '#111A4A' },
        blue: { primary: '#1428DC', light: '#2E4FFF' },
        cyan: { accent: '#3CA0B4', light: '#5084C8' },
        'off-white': '#F0F2FB',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'holographic': 'linear-gradient(135deg, #1428DC, #3CA0B4, #9859FF)',
        'radial-hero': 'radial-gradient(ellipse at 80% 20%, #1428DC, #050A1E)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(20,40,220,0.4), 0 0 60px rgba(20,40,220,0.15)',
        'glow-cyan': '0 0 20px rgba(60,160,180,0.4)',
        'premium': '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}
