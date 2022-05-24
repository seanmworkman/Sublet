const { gql } = require("apollo-server")

const typeDefs = gql`
  type User {
    first_name: String
    last_name: String
    phone: String
    email: String
  }

  type Query {
    users: [User]
    getAllUsers: [User]
  }
`

module.exports.typeDefs = typeDefs;