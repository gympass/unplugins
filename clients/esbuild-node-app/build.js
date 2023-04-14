/* eslint-disable import/no-unresolved */
import { build } from 'esbuild';

import unpluginGraphQLParser from 'unplugin-graphql-parse/esbuild';
import unpluginResolveEsmTSPaths from 'unplugin-resolve-esm-ts-paths/esbuild';

await build({
  entryPoints: [
    './src/index.ts',
    './src/reexport.ts',
    './src/config.ts',
    './src/resolvers/bookResolver.ts',
    './src/graphql/schema.gql',
  ],
  outdir: 'dist',

  platform: 'node',
  logLevel: 'debug',
  treeShaking: true,

  sourcemap: true,
  sourcesContent: false,

  plugins: [
    unpluginGraphQLParser({
      ext: '.gql',
    }),
    unpluginResolveEsmTSPaths({
      resolveGlob: true,
    }),
  ],
});
