import { ApolloServer, gql } from "apollo-server";

import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))