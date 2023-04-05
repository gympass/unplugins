import gql from 'graphql';
import { createUnplugin } from 'unplugin';

export type Options = {
  ext: string;
};

const defaults: Options = { ext: '.graphql' };

const unpluginGraphQLParser = createUnplugin<Options | undefined>(
  (options = defaults) => ({
    name: 'unplugin-graphql-parser',
    transformInclude(id) {
      return id.endsWith(options.ext);
    },
    transform(code) {
      const schema = JSON.stringify(gql.parse(code));

      const contents = `const schema = ${schema};
export default schema;
`;

      return contents;
    },
  }),
);

export default unpluginGraphQLParser;
