import type { ImportSpecifier } from 'es-module-lexer';
import { relative } from 'node:path';
import glob from 'tiny-glob';
import { removeExt } from '../helpers/index.js';

export async function resolveGlob(
  id: string,
  fileImport: ImportSpecifier,
  dir: string,
  endExt: string,
  importString: string,
) {
  const file = fileImport.n as string;

  const files = await glob(file.split(':')[1], {
    cwd: dir,
    filesOnly: true,
  });

  const selfPath = relative(dir, id);
  const filteredFiles = files.filter(f => f !== selfPath);

  const modulesImports = filteredFiles
    .map(
      (module, index) =>
        // Since this is the transpiled code, we can't have
        // extensions other than .js. That's why we replace everything.
        `import module${index} from './${removeExt(module)}${endExt}'`,
    )
    .join('\n');

  const modules = filteredFiles.map((_, index) => `module${index}`).join(', ');

  const variable = (
    importString.match(/import (.*) from/) as RegExpMatchArray
  ).pop();

  const newCode = `
    ${modulesImports}
    const ${variable} = [${modules}]
  `;

  return [importString, newCode] as [string, string];
}
