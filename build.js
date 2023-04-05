/* eslint-disable import/no-extraneous-dependencies */
import { build } from 'esbuild';
import glob from 'tiny-glob';

const args = process.argv.slice(2);
const watch = args.includes('-w');

const commonOptions = {
  entryPoints: await glob('src/**/!(*.test).*'),

  logLevel: 'info',

  minify: true,
  treeShaking: true,

  sourcemap: true,
  sourcesContent: false,
};

// Only build CJS if not on watch mode.
if (!watch)
  await build({
    ...commonOptions,
    outdir: 'dist/cjs',

    format: 'cjs',
    keepNames: true,
  });

// Only watch the ESM module for simplicity.
await build({
  ...commonOptions,
  outdir: 'dist/esm',

  watch,
});
