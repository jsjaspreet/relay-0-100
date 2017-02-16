import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import pgPool from '../../src/server/pgPool'
import pgdbCreator from '../../database/pgdb'
import LinkConnectionType from '../types/linkConnection'
import storeType from '../types/store'

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
      type: LinkConnectionType.edgeType,
      resolve: (obj) => ({ node: obj, cursor: obj.id })
    },
    store: {
      type: storeType,
      resolve: () => ({})
    }
  },
  mutateAndGetPayload: (input) => {
    const pgdb = pgdbCreator(pgPool)
    return pgdb.deleteLink(input)
  }
})

export default deleteLinkMutation