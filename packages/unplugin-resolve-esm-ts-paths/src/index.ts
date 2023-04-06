import { createUnplugin } from 'unplugin';

import type { Options } from './options.js';
import { transform, transformInclude } from './core.js';

const defaults: Options = {
  ext: '.ts',
  resolveGlob: false,
  resolvedExt: '.js',
};

const unpluginResolveEsmTSPaths = createUnplugin<Options | undefined>(
  options => {
    const mergedDefaults = { ...defaults, ...options };

    return {
      name: 'unplugin-resolve-esm-ts-paths',
      transformInclude: id => transformInclude(id, mergedDefaults),
      transform: (code, id) => transform(code, id, mergedDefaults),
    };
  },
);

export default unpluginResolveEsmTSPaths;
