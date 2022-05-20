const { gql } = require("apollo-server")

const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`

module.exports.typeDefs = typeDefs;