const formKitTailwind = require('@formkit/themes/tailwindcss')

module.exports = {
  // purge: ['./app.vue', './components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html}', './formkit.config.js'],
  plugins: [
    formKitTailwind
  ],
  theme: {
    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '18px',
      '2xl': '20px'
    }
  }
}
