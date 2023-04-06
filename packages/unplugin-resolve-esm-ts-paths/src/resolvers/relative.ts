import { join } from 'node:path';
import { isDirectory, removeExt } from '../helpers/index.js';

export async function resolveRelative(
  file: string,
  dir: string,
  endExt: string,
  correctQuote: string,
): Promise<[string, string]> {
  return [
    `${correctQuote}${file}${correctQuote}`,
    (await isDirectory(`${join(dir, file)}`))
      ? `'${file}/index${endExt}'`
      : `'${removeExt(file)}${endExt}'`,
  ];
}
