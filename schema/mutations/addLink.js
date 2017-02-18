import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import {
  mutationWithClientMutationId
} from 'graphql-relay'

import moment from 'moment'

import pgPool from '../../src/server/pgPool'
import pgdbCreator from '../../database/pgdb'
import LinkConnectionType from '../types/linkConnection'
import storeType from '../types/store'

const AddLinkMutation = mutationWithClientMutationId({
  name: 'AddLink',
  inputFields: {
    link: { type: new GraphQLNonNull(GraphQLString) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
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
    const createdAt = moment().toISOString()
    return pgdb.addLink({ ...input, createdAt })
  }
})

export default AddLinkMutation