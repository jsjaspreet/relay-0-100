import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import storeType from './types/store'

const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: storeType,
        resolve: () => ({})
      }
    })
  })
})

export default RootSchema
