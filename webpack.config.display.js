// webpack config for export react displayFeedback component
const merge = require('webpack-merge');
const basic = require('./webpack.config');

const webpackConfig = merge(basic, {
  mode: 'production',
  entry: './displayFeedback.jsx',
  output: {
    filename: 'displayFeedback-component.js'
  },
  resolve: {},
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom'
  }
})

module.exports = webpackConfig
