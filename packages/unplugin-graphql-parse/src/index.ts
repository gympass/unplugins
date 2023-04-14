import { createUnplugin } from 'unplugin';

import type { Options } from './options.js';
import { transform, transformInclude } from './core.js';

const defaults: Options = { ext: '.graphql' };

const unpluginGraphQLParser = createUnplugin<Options | undefined>(
  (options = defaults) => {
    const mergedDefaults = { ...defaults, ...options };

    return {
      name: 'unplugin-graphql-parser',
      transformInclude: id => transformInclude(id, mergedDefaults),
      transform,
    };
  },
);

export default unpluginGraphQLParser;
