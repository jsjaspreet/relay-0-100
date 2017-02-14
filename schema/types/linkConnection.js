import {
  connectionDefinitions
} from 'graphql-relay'
import LinkType from './link'


const LinkConnection = connectionDefinitions({
  name: 'linkConnection',
  nodeType: LinkType
})

export default LinkConnection