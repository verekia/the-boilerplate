const path = require('path')

const tsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const isDevServer = process.env.WEBPACK_DEV_SERVER

module.exports = {
  entry: './src/_client/client',
  mode: isDevServer ? 'development' : 'production',
  devtool: isDevServer ? 'cheap-source-map' : false,
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist/js') },
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader' }] },
  resolve: { extensions: ['.ts', '.tsx', '.js'], plugins: [new tsConfigPathsPlugin()] },
}
