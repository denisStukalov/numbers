module.exports = {
  purge: [],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [require('autoprefixer'), require('postcss-nested')],
  future: {
    removeDeprecatedGapUtilities: true
  }
}
