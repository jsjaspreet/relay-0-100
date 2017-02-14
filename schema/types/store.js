import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField
} from 'graphql-relay'

import linkConnection from './linkConnection'
import pgdbCreator from '../../database/pgdb'

const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: {
    id: globalIdField("Store"),
    linkConnection: {
      type: linkConnection.connectionType,
      args: connectionArgs,
      resolve: (obj, args, { pgPool }) => {
        const pgdb = pgdbCreator(pgPool)
        return connectionFromPromisedArray(pgdb.getLinks(), args)
      }
    }
  }
})

export default storeType
