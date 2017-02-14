const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals');


module.exports = {
  // Targeting a server node environment
  target: 'node',
  entry: './src/server/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  }
}