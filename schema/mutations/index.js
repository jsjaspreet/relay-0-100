import {
  GraphQLObjectType
} from 'graphql'

import CreateLinkMutation from './addLink'
import DeleteLinkMutation from './deleteLink'

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    CreateLink: CreateLinkMutation,
    DeleteLink: DeleteLinkMutation
  })
})

export default RootMutationType

