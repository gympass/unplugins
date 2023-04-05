/* eslint-disable import/no-extraneous-dependencies */
import { build, context } from 'esbuild';

const args = process.argv.slice(2);
const watch = args.includes('-w');

const entryPoints = [
  'src/esbuild.ts',
  'src/index.ts',
  'src/rollup.ts',
  'src/rspack.ts',
  'src/vite.ts',
  'src/webpack.ts',
];

const commonOptions = {
  entryPoints,

  logLevel: 'info',

  bundle: true,
  packages: 'external',

  minify: true,
  treeShaking: true,

  sourcemap: true,
  sourcesContent: false,
};

const cjsOptions = {
  ...commonOptions,

  outdir: 'dist/cjs',
  outExtension: { '.js': '.cjs' },

  format: 'cjs',
  keepNames: true,
};

const esmOptions = {
  ...commonOptions,

  splitting: true,

  outdir: 'dist/esm',
  outExtension: { '.js': '.mjs' },

  format: 'esm',
};

// Only watch the ESM module for simplicity.
if (watch) {
  const ctx = await context(esmOptions);
  await ctx.watch();
} else {
  await build(esmOptions);
  await build(cjsOptions);
}
