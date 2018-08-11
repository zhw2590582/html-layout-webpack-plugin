const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlLayoutWebpackPlugin = require("../");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
	mode: isProd ? "production" : "development",
	entry: "./index.js",
	output: {
		path: __dirname + "/dist",
		filename: "index_bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html"
		}),
		new HtmlLayoutWebpackPlugin({
			include: path.resolve('./includes'),
			layout: path.resolve('./layouts')
		})
	]
}