import { parse } from 'graphql';

import type { Options } from './options';

export function transform(code: string) {
  const schema = JSON.stringify(parse(code));

  const contents = `const schema = ${schema};
export default schema;
`;

  return contents;
}

export function transformInclude(id: string, options: Options) {
  return id.endsWith(options.ext);
}
