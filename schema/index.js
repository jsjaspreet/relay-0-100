import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'
import {
  mutationWithClientMutationId
} from 'graphql-relay'
import pgPool from '../src/server/pgPool'
import moment from 'moment'
import pgdbCreator from '../database/pgdb'


class Store {
}
let store = new Store()

let nodeDefs = nodeDefinitions(
  (globalId) => {
    let { type } = fromGlobalId(globalId)
    if (type === 'Store') {
      return store
    }
    return null
  },
  (obj) => {
    if (obj instanceof Store) {
      return storeType
    }
    return null
  }
)

const linkType = new GraphQLObjectType({
  name: 'LinkType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    link: { type: new GraphQLNonNull(GraphQLString) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }
})

const linkConnection = connectionDefinitions({
  name: 'LinkConnection',
  nodeType: linkType
})

const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: {
    id: globalIdField("Store"),
    linkConnection: {
      type: linkConnection.connectionType,
      args: {
        ...connectionArgs,
        query: { type: GraphQLString }
      },
      resolve: (obj, args, { pgPool }) => {
        const pgdb = pgdbCreator(pgPool)
        return connectionFromPromisedArray(pgdb.getLinks(args.limit, args.query), args)
      }
    }
  },
  interfaces: [nodeDefs.nodeInterface]
})

const addLinkMutation = mutationWithClientMutationId({
  name: 'AddLink',
  inputFields: {
    link: { type: new GraphQLNonNull(GraphQLString) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    link: {
      type: linkConnection.edgeType,
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
      type: linkConnection.edgeType,
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

const updateLinkMutation = mutationWithClientMutationId({
  name: 'UpdateLink',
  inputFields: {
    link: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    link: {
      type: linkType,
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


const RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      node: nodeDefs.nodeField,
      store: {
        type: storeType,
        resolve: () => store
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
      AddLink: addLinkMutation,
      DeleteLink: deleteLinkMutation,
      UpdateLink: updateLinkMutation
    })
  })

})

export default RootSchema
