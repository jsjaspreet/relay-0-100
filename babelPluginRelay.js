var babelRelayPlugin = require('babel-relay-plugin')
var schemaData = require('./linksSchema.json').data
var plugin = babelRelayPlugin(schemaData)

module.exports = plugin