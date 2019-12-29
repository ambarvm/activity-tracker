const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
	{
		entry: {
			index: './src/public/scripts/index.ts',
		},
		mode: 'development',
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/public/index.html',
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new CleanWebpackPlugin(),
		],
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, './dist/public'),
			chunkFilename: '[name].js',
		},
		module: {
			rules: [
				{
					test: /.ts$/,
					use: ['ts-loader'],
				},
				{
					test: /.css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
			],
		},
	},
];
