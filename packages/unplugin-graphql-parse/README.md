# `unplugin-graphql-parse`

Parse GraphQL SDL files to DocumentNode AST objects. This is useful for passing it to Graphql Servers, for example.


```ts
import sdl from 'Schema.graphql';

console.log(sdl);
/**
 *  Object
 *   definitions: [{…}]
 *   kind: "Document"
 *   loc: {start: 0, end: 25}
*/
```

## Options

- `ext` (default: `.graphql`): With file extension should the plugin parse.

## Usage

<details>
<summary>Vite</summary></br>

```ts
// vite.config.ts
import graphqlParse from 'unplugin-graphql-parse/vite'

export default defineConfig({
  plugins: [
    graphqlParse({ /* options */ }),
  ],
})
```

</details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import graphqlParse from 'unplugin-graphql-parse/rollup'

export default {
  plugins: [
    graphqlParse({ /* options */ }),
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
    require('unplugin-graphql-parse/webpack')({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import graphqlParse from 'unplugin-graphql-parse/esbuild'

build({
  /* ... */
  plugins: [
    graphqlParse({ /* options */ }),
  ],
})
```

<br></details>

## Types

If you want to solve the `ts(2307)` issue and also get type safety/autocompletion, you can add this to one of your `.d.ts` type definitions:

```ts
declare module '*.graphql' {
  import type { DocumentNode } from 'graphql';

  const module: DocumentNode;
  export = module;
}
```
