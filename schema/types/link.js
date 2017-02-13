import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

const LinkType = new GraphQLObjectType({
  name: 'LinkType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    link: { type: new GraphQLNonNull(GraphQLString) },
    linkTitle: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }
})

export default LinkType
