import {
  mutationWithClientMutationId
} from 'graphql-relay'
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { Link, StoreType, store } from '../types'
import pgdbCreator from '../../database/pgdb'
import pgPool from '../../src/server/pgPool'

const updateLinkMutation = mutationWithClientMutationId({
  name: 'UpdateLink',
  inputFields: {
    link: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    link: {
      type: Link,
      resolve: (obj) => obj
    },
    store: {
      type: StoreType,
      resolve: () => store
    }
  },
  mutateAndGetPayload: (input) => {
    const pgdb = pgdbCreator(pgPool)
    return pgdb.updateLink(input)
  }
})

export default updateLinkMutation



