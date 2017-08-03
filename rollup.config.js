import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import cleanup from 'rollup-plugin-cleanup';

export default [
  {
    entry: './src/index.js',
    dest: './lib/index.js',
    format: 'umd',
    moduleName: 'DPR',
    plugins: [
      json(),
      resolve(),
      commonjs(),
      buble(),
      cleanup()
    ]
  },
  {
    entry: './src/index.js',
    dest: './lib/index.es.js',
    format: 'es',
    external: [
      'eventdispatcher.js',
      'lodash.assign'
    ],
    plugins: [ json() ]
  }
];
