import { createPathsMatcher, getTsconfig } from 'get-tsconfig';
import { createRequire } from 'node:module';
import { relative } from 'node:path';

import { MODULE_IMPORT, isDirectory, removeExt } from '../helpers/index.js';

const tsconfig = getTsconfig();
if (!tsconfig) throw new Error('No tsconfig found');
const pathsMatcher = createPathsMatcher(tsconfig);

const require = createRequire(`file://${process.cwd()}/`);

export async function resolvePaths(
  file: string,
  dir: string,
  endExt: string,
  correctQuote: string,
): Promise<[string, string]> {
  try {
    /**
     * Try to resolve the path, this tells us if the path is a module import.
     *
     * If it works (node could resolve the path), then our work here is done.
     */
    require.resolve(file);

    return [MODULE_IMPORT, MODULE_IMPORT];
  } catch {
    /**
     * Handle "Error: Cannot find module" error. (Alised paths)
     *
     * Find wich alias matches the import and resolves
     * it relative to the current file.
     */
    if (!pathsMatcher) throw new Error('No paths declared');
    const [resolvedFile] = pathsMatcher(file);

    const relativePath = relative(dir, resolvedFile);

    return [
      `${correctQuote}${file}${correctQuote}`,
      (await isDirectory(`${resolvedFile}`))
        ? `'./${relativePath}/index${endExt}'`
        : `'./${removeExt(relativePath)}${endExt}'`,
    ];
  }
}
