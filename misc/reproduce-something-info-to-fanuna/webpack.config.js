const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      timers: require.resolve('timers-browserify'),
      string_decoder: require.resolve('string_decoder/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify/browser'),
    },
  },
  // https://stackoverflow.com/questions/30239060/uncaught-referenceerror-process-is-not-defined
  plugins: [
    new webpack.DefinePlugin({
      process: {},
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
};
