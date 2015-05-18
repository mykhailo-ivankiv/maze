var path = require('path');

module.exports = {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
  ],

  entry: path.resolve(__dirname, 'src/js/main.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
