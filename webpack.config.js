const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENV = process.env.NODE_ENV || 'development'
const isDev = ENV !== 'production'

const cssLoader = [{
  loader: 'css-loader'
}, {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]
  }
}]

const plugins = [
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(require('./package.json').version)
  })
]

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'feedback.js',
    libraryTarget: 'umd',
    library: 'Feedback'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.less'],
     alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@tests': path.resolve(__dirname, 'src/tests'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: isDev ?
          ['style-loader'].concat(cssLoader)
          :
          [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            }
          ],
      },
      {
        test: /\.less$/,
        use: isDev ? [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
          :
          [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true
              }
            }
          ],
      },
      // {
      //   test: /\.less$/,
      //   exclude: [
      //     path.resolve(__dirname, 'src/apps'),
      //   ],
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'less-loader', // compiles Less to CSS
      //       options: {
      //         modifyVars: {
      //           hack: 'true; @import "~@styles/color-board.less";', // Override with less file
      //         },
      //         javascriptEnabled: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 10
          }
        }]
      }
    ]
  },
  plugins: isDev ?
    [...plugins, new webpack.NoEmitOnErrorsPlugin()]
    :
    [...plugins, new MiniCssExtractPlugin({ filename: 'feedback.css' })],

  devtool: isDev ? 'cheap-module-source-map' : 'source-map',

  devServer: {
    port: process.env.PORT || 8088,
    host: 'localhost',
    // publicPath: '/dist',
    contentBase: './dev',
    // historyApiFallback: true,
    // open: true
  }
}
