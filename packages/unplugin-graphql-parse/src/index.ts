import { createUnplugin } from 'unplugin';

import type { Options } from './options';
import { transform, transformInclude } from './core';

const defaults: Options = { ext: '.graphql' };

const unpluginGraphQLParser = createUnplugin<Options | undefined>(
  (options = defaults) => ({
    name: 'unplugin-graphql-parser',
    transformInclude: id => transformInclude(id, options),
    transform,
  }),
);

export default unpluginGraphQLParser;
