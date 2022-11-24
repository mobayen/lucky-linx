module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: [
          'Poppins',
          'sans-serif'
        ],
        Merriweather: [
          'Merriweather',
          'serif'
        ]
      }
    }
  },
  plugins: []
}
