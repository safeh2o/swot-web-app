/* eslint-disable no-undef */
var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
require("dotenv").config();

module.exports = (_env, argv) => {
	const plugins = [
		new HtmlWebpackPlugin({
			template: "src/index.ejs",
			inject: "body",
			gtag: process.env.GOOGLE_ANALYTICS_GTAG,
			filename: "index.html",
		}),
	];

	if (argv?.mode?.toLowerCase() === "development") {
		console.log("Generating source maps");
		plugins.push(new SourceMapDevToolPlugin({}));
	}

	const config = {
		// This will be the entry file for all of our React code
		entry: ["./src/index.jsx", "./src/styles/site.scss"],
		// This will be where the final bundle file will be saved
		output: {
			path: path.join(__dirname, "public"),
			filename: "js/bundle.js",
			publicPath: "/",
		},
		// Adding babel loader to compile our javascript and jsx files
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/env",
									{
										targets: {
											edge: "17",
											firefox: "60",
											chrome: "67",
											safari: "11.1",
										},
										useBuiltIns: "usage",
										corejs: "3.6.5",
									},
								],
								[
									"@babel/preset-react",
									{
										runtime: "automatic",
									},
								],
							],
						},
					},
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "styles/[name].css",
							},
						},
						"extract-loader",
						// Translates CSS into CommonJS
						"css-loader?-url",
						// Compiles Sass to CSS
						"sass-loader",
					],
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
			],
		},
		devServer: {
			port: 8080,
			historyApiFallback: true,
			static: { directory: path.join(__dirname, "public") },
			onAfterSetupMiddleware: function (devServer) {
				devServer.app.disable("x-powered-by");
			},
			proxy: {
				"/api": "http://0.0.0.0:3000",
				"/admin": "http://0.0.0.0:3000",
			},
		},
		devtool: false,
		plugins,
		resolve: {
			extensions: [".js", ".jsx", ".scss"],
		},
	};

	return config;
};
