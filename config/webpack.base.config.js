const path = require('path');

const root = path.resolve(__dirname, '../');
const dist = path.resolve(root, 'dist');

module.exports = {
  entry: {
    index: './src/index',
  },
  output: {
    publicPath: './',
    path: dist,
    filename: 'vue-twzipcode.js',
  },
  module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}]
	},
  resolve: {
    extensions: [ '.js', '.vue' ],
  },
};
