// webpack config for export react addFeedback component
const merge = require('webpack-merge');
const basic = require('./webpack.config');

const webpackConfig = merge(basic, {
  mode: 'production',
  entry: './addFeedback.jsx',
  output: {
    filename: 'addFeedback-component.js'
  },
  resolve: {},
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom'
  }
})

module.exports = webpackConfig
