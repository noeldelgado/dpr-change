import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import cleanup from 'rollup-plugin-cleanup';

export default {
  entry: './src/index.js',
  dest: './lib/index.js',
  format: 'umd',
  moduleName: 'DPR',
  plugins: [
    json(),
    nodeResolve({ main: true }),
    commonjs(),
    buble(),
    cleanup()
  ]
};
