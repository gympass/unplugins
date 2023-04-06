import { stat } from 'node:fs/promises';

export const BROKEN_IMPORT = 'BROKEN_IMPORT';
export const MODULE_IMPORT = 'MODULE_IMPORT';

export async function isDirectory(path: string) {
  try {
    return (await stat(path)).isDirectory();
  } catch (e) {
    return false;
  }
}

export function escapePathForRegExp(path: string) {
  return path.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function removeExt(path: string) {
  // https://stackoverflow.com/a/12900504/4223135
  // eslint-disable-next-line no-bitwise
  const ext = path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
  return path.replace(new RegExp(`\\.${ext}$`), '');
}
