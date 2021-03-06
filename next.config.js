/// <reference types="next-react-svg" />
const withReactSvg = require('next-react-svg')
const withPWA = require('next-pwa')
const path = require('path')

module.exports = withPWA(withReactSvg({
  include: path.resolve(__dirname, 'public'),
  webpack(config, options) {
    return config
  },
  future: { webpack5: true, },
  pwa: {
    dest: 'public'
  }
}))