import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins: [
    babel({
      babelrc: false,
      presets: ["babel-preset-es2015-rollup"]
    })
  ],
  dest: 'bundle.js'
};
