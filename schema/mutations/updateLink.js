import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql'

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import pgPool from '../../src/server/pgPool'
import pgdbCreator from '../../database/pgdb'
import LinkType from '../types/link'
import storeType from '../types/store'

const updateMutation = mutationWithClientMutationId({
  name: 'UpdateLink',
  inputFields: {
    link: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    link: {
      type: LinkType,
      resolve: (obj) => obj
    },
    store: {
      type: storeType,
      resolve: () => ({})
    }
  },
  mutateAndGetPayload: (input) => {
    const pgdb = pgdbCreator(pgPool)
    return pgdb.updateLink(input)
  }
})

export default updateMutation