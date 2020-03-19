const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')


module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new Dotenv({
      path: './.env.production',
      systemvars: true,
    }),
    new OptimizeCssAssetsPlugin(),
    new MinifyPlugin(),
    new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt'),
  ],
})
