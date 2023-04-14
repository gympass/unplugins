# `unplugin-resolve-esm-ts-paths`

Resolve `import` and `export` expressions using the TSConfig `paths` and `baseUrl`. This was made to be used on Node environments where you need to have relative imports and most transpile tools (even `tsc` itself) doesn't change imports.

Powered by [`get-tsconfig`](https://github.com/privatenumber/get-tsconfig) and [`es-module-lexer`](https://github.com/guybedford/es-module-lexer).

### Features
- Resolve TSConfig paths to relative paths.
- Add `index` files for directory imports.
- Add file extensions.
- Extra: Ability to have glob imports.
  Import paths containing the `glob:` keyword will be parsed by the plugin and the default imports of every file matching the glob will be added to the file. The result will be a variable containing an array with all the default exports.

With this TSConfig and Options:
```json
{
  "baseUrl": "src",
  "paths": {
    "@test/*": [
      "test/*"
    ],
  },
}
```
```js
{
  ext: '.ts',
  resolveGlob: true,
  resolvedExt: '.js',
}
```

In:
```ts
import foo from './foo'
import doubleQ from "./doubleQ"
import { build } from 'esbuild'
import item from '@test/file'
import glob from 'glob:./*.js'
```

Out:
```js
import foo from './foo.js'
import doubleQ from './doubleQ.js'
import { build } from 'esbuild'
import item from './src/test/file.js'
import module0 from './randomModule.js'
import module1 from './anotherRandomModule.js'
import module2 from './yetAnotherRandomModule.js'
const glob = [module0, module1, module2]
```

## Options

- `ext` (default: `.ts`): Which file extension should the plugin match.
- `resolvedExt` (default: `.js`): Which extension should be added to the imports.
- `resolveGlob` (default: `false`): If glob expressions should be resolved.

## Usage

<details>
<summary>Vite</summary></br>

```ts
// vite.config.ts
import unpluginResolveEsmTSPaths from 'unplugin-resolve-esm-ts-paths/vite'

export default defineConfig({
  plugins: [
    unpluginResolveEsmTSPaths({ /* options */ }),
  ],
})
```

</details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import unpluginResolveEsmTSPaths from 'unplugin-resolve-esm-ts-paths/rollup'

export default {
  plugins: [
    unpluginResolveEsmTSPaths({ /* options */ }),
    // other plugins
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-resolve-esm-ts-paths/webpack')({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import unpluginResolveEsmTSPaths from 'unplugin-resolve-esm-ts-paths/esbuild'

build({
  /* ... */
  plugins: [
    unpluginResolveEsmTSPaths({ /* options */ }),
  ],
})
```

<br></details>

## Types

If you want to solve the `ts(2307)` issue for the glob imports, you can add this to one of your `.d.ts` type definitions:

```ts
declare module 'glob:*' {
  const modules: unknown[];
  export default modules;
}
```
