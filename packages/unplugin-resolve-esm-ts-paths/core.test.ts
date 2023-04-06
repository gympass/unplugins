import { transform, transformInclude } from './src/core.js';
import type { Options } from './src/options.js';

const code = `
  import foo from './foo';
  import doubleQ from "./doubleQ";
  import { build } from 'esbuild'
  import item from '@test/file'
  import glob from 'glob:./*.md'
`;

it('should accept the incomming ext', () => {
  expect(transformInclude('foo.ts', { ext: '.ts' } as Options)).toBeTruthy();
  expect(transformInclude('foo.ts', { ext: '.js' } as Options)).toBeFalsy();
});

it('should resolve imports', async () => {
  const r = await transform(code, 'foo.ts', {
    ext: '.ts',
    resolveGlob: true,
    resolvedExt: '.js',
  });

  expect(r).toMatchSnapshot();
});
