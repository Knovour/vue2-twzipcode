/**
 * Created by casperlai on 2016/7/2.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const webpackConfig = merge(baseConfig, {
  output: {
    library: 'twzipcode',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
  ],
});

module.exports = webpackConfig;