var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
require("dotenv").config();

module.exports = {
	// Since webpack 4 we will need to set in what mode webpack is running
	mode: "development",
	// This will be the entry file for all of our React code
	entry: ["./src/index.jsx", "./src/styles/site.scss"],
	// This will be where the final bundle file will be outputed
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
						presets: ["@babel/preset-react", "@babel/preset-env"],
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
		contentBase: path.join(__dirname, "public"),
		proxy: {
			"/api": "http://localhost:3000",
			"/admin": "http://localhost:3000",
		},
	},
	devtool: false,
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.ejs",
			inject: "body",
			gtag: process.env.GOOGLE_ANALYTICS_GTAG,
			grecaptcha: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
			filename: "index.html",
		}),
		new SourceMapDevToolPlugin({}),
	],
	resolve: {
		extensions: [".js", ".jsx", ".scss"],
	},
};
