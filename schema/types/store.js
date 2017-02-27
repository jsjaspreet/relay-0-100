import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

import linkConnection from './linkConnection'
import pgdbCreator from '../../database/pgdb'

class Store {
}
let store = new Store()

let nodeDefs = nodeDefinitions(
  (globalId) => {
    let { type } = fromGlobalId(globalId)
    if (type === 'Store') {
      return store
    }
    return null
  },
  (obj) => {
    if (obj instanceof Store) {
      return storeType
    }
    return null
  }
)


const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: {
    id: globalIdField("Store"),
    linkConnection: {
      type: linkConnection.connectionType,
      args: {
        ...connectionArgs,
        query: { type: GraphQLString }
      },
      resolve: (obj, args, { pgPool }) => {
        const pgdb = pgdbCreator(pgPool)
        return connectionFromPromisedArray(pgdb.getLinks(args.limit, args.query), args)
      }
    }
  },
  interfaces: () => [nodeDefs.nodeInterface]
})

export { storeType, nodeDefs, store }
