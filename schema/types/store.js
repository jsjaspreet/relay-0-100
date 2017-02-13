import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import linkType from './link'
import pgdbCreator from '../../database/pgdb'

const storeType = new GraphQLObjectType({
  name: 'Store',
  fields: {
    links: {
      type: new GraphQLList(linkType),
      resolve: (obj, args, { pgPool }) => {
        const pgdb = pgdbCreator(pgPool)
        return pgdb.getLinks()
      }
    }
  }
})

export default storeType
