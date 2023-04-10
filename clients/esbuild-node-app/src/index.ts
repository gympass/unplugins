import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from '@graphql/schema.gql';
import resolvers from 'glob:./resolvers/**/*';

import typeDefsTest from './graphql/schema.gql';

import { config } from './reexport';

console.log({ typeDefs, resolvers, typeDefsTest });

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: config.PORT },
});

console.log(`🚀  Server ready at: ${url}`);
