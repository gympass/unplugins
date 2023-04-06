import { parse } from 'es-module-lexer';

import { dirname } from 'node:path';

import type { Options } from './options.js';
import { resolveGlob } from './resolvers/glob.js';
import { resolveRelative } from './resolvers/relative.js';
import { resolvePaths } from './resolvers/paths.js';
import {
  BROKEN_IMPORT,
  MODULE_IMPORT,
  escapePathForRegExp,
} from './helpers/index.js';

export async function transform(code: string, id: string, options: Options) {
  const dir = dirname(id);

  const endExt = options.resolvedExt;

  try {
    const [imports] = await parse(code);

    if (imports.length === 0) return code;

    const replaceMapPromises = imports.map<Promise<[string, string]>>(
      fileImport => {
        const file = fileImport.n;
        if (!file) return Promise.resolve([BROKEN_IMPORT, BROKEN_IMPORT]);

        const importString = code.substring(fileImport.ss, fileImport.se);

        const correctQuote = (
          /'|"/.exec(importString) as RegExpExecArray
        ).pop() as string;

        // Resolve Glob imports.
        if (options.resolveGlob && file.includes('glob:')) {
          return resolveGlob(id, fileImport, dir, endExt, importString);
        }

        // Add index file import for relative directory imports.
        if (file.includes('./')) {
          return resolveRelative(file, dir, endExt, correctQuote);
        }

        return resolvePaths(file, dir, endExt, correctQuote);
      },
    );

    // Clear the map keeping unique keys and remove module imports.
    const replaceMap = new Map<string, string>(
      await Promise.all(replaceMapPromises),
    );
    replaceMap.delete(MODULE_IMPORT);
    replaceMap.delete(BROKEN_IMPORT);

    // If size is zero, there are only modules imports.
    if (replaceMap.size === 0) return code;

    const allPathsRegExp = new RegExp(
      [...replaceMap.keys()].map(escapePathForRegExp).join('|'),
      'g',
    );

    return code.replace(allPathsRegExp, match => {
      return replaceMap.get(match) as string;
    });
  } catch (error) {
    /**
     * If we get a problem during parsing, we return the original
     * code so the bundler can handle it.
     */
    return code;
  }
}

export function transformInclude(id: string, options: Options) {
  if (options.ext instanceof RegExp) {
    return Boolean(id.match(options.ext));
  }
  return id.endsWith(options.ext);
}
