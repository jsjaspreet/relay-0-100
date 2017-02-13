const { resolve } = require('path')

module.exports = {
  // Targeting a server node environment
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'server.js',
    path: resolve(__dirname, 'build')
  }
}