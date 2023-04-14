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
  let pathWithoutDots = path;
  if (path.includes('..')) {
    const parts = path.split('..');
    pathWithoutDots = parts[parts.length - 1];
  }

  // https://stackoverflow.com/a/12900504/4223135
  const ext = pathWithoutDots.slice(
    // eslint-disable-next-line no-bitwise
    ((pathWithoutDots.lastIndexOf('.') - 1) >>> 0) + 2,
  );

  return path.replace(new RegExp(`\\.${ext}$`), '');
}
