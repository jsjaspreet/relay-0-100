import {
  GraphQLObjectType
} from 'graphql'

import CreateLinkMutation from './addLink'
import DeleteLinkMutation from './deleteLink'
import UpdateLinkMutation from './updateLink'

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddLink: CreateLinkMutation,
    DeleteLink: DeleteLinkMutation,
    UpdateLink: UpdateLinkMutation
  })
})

export default RootMutationType

