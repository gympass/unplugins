declare module '*.gql' {
  import type { DocumentNode } from 'graphql';

  const modules: DocumentNode[];
  export default modules;
}

declare module 'glob:*' {
  const modules: unknown[];
  export default modules;
}
