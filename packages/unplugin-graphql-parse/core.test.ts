import { transform, transformInclude } from './src/core';

it('should accept the incomming ext', () => {
  expect(transformInclude('foo.graphql', { ext: '.graphql' })).toBe(true);
});

it('should parse graphql sdls', () => {
  const sdl = /* GraphQL */ `
    type MyType {
      id: ID
    }
  `;

  expect(transform(sdl)).toMatchSnapshot();
});
