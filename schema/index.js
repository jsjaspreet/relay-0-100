import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import storeType from './types/store'
import mutationType from './mutations'

const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: storeType,
        resolve: () => ({})
      }
    })
  }),
  mutation: mutationType
})

export default RootSchema
