import {
  mutationWithClientMutationId
} from 'graphql-relay'
import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import moment from 'moment'
import { LinkConnection, StoreType, store } from '../types'
import pgdbCreator from '../../database/pgdb'
import pgPool from '../../src/server/pgPool'


const addLinkMutation = mutationWithClientMutationId({
  name: 'AddLink',
  inputFields: {
    link: { type: new GraphQLNonNull(GraphQLString) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
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
    const createdAt = moment().toISOString()
    return pgdb.addLink({ ...input, createdAt })
  }
})

export default addLinkMutation
