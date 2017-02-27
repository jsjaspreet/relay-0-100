import {
  mutationWithClientMutationId
} from 'graphql-relay'
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { LinkConnection, StoreType, store } from '../types'
import pgdbCreator from '../../database/pgdb'
import pgPool from '../../src/server/pgPool'


const deleteLinkMutation = mutationWithClientMutationId({
  name: 'DeleteLink',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedLinkId: {
      type: GraphQLString,
      resolve: (obj) => obj.id
    },
    link: {
      type: LinkConnection.edgeType,
      resolve: (obj) => ({ node: obj, cursor: obj.id })
    },
    store: {
      type: StoreType,
      resolve: () => store
    }
  },
  mutateAndGetPayload: (input) => {
    const pgdb = pgdbCreator(pgPool)
    return pgdb.deleteLink(input)
  }
})

export default deleteLinkMutation
