const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")

const { typeDefs } = require('./graphql/schema.js');
const { resolvers } = require('./graphql/resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))