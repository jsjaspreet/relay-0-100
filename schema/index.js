import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import { StoreType, store, nodeDefs } from './types'
import { AddLinkMutation, DeleteLinkMutation, UpdateLinkMutation } from './mutations'

const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      node: nodeDefs.nodeField,
      store: {
        type: StoreType,
        resolve: () => store
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
      AddLink: AddLinkMutation,
      DeleteLink: DeleteLinkMutation,
      UpdateLink: UpdateLinkMutation
    })
  })

})

export default RootSchema
