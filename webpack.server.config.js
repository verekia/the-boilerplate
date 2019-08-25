const slsw = require('serverless-webpack')
const tsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')

process.env.STAGE = slsw.lib.options.stage

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.options.stage === 'dev' ? 'development' : 'production',
  target: 'node',
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader' }] },
  stats: { warningsFilter: w => w !== 'CriticalDependenciesWarning' },
  resolve: { extensions: ['.ts', '.tsx', '.js'], plugins: [new tsConfigPathsPlugin()] },
}
