import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import UsersSchema from '../../api/users/Users.graphql'

const typeDefs = [`type Query { hi: String }`, UsersSchema]

const resolvers = {
  Query: {
    hi() {
      return 'Hello!'
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })