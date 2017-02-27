import linkType from './link'
import { connectionDefinitions } from 'graphql-relay'

const linkConnection = connectionDefinitions({
  name: 'LinkConnection',
  nodeType: linkType
})

export default linkConnection
