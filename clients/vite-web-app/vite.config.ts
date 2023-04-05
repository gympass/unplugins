/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inspect from 'vite-plugin-inspect';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import graphqlParse from 'unplugin-graphql-parse/vite';

// console.log(graphqlParse.vite());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inspect(), graphqlParse()],
});
