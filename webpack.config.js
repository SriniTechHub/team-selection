var webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: "dist/assets",
		filename: "bundle.js",
		publicPath: "assets"
	},
	devServer: {
		inline: true,
		contentBase: './dist',
		port: 4000,
		hot: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader"],
				query: {
					presets: ["latest", "stage-0"]
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
			{ test: /\.html$/, loader: "html"}
		]
	},

        resolve: {
            extensions: ['', '.js', '.less'],
            alias: {
                bootstrap: __dirname+'node_modules/bootstrap-less/bootstrap/bootstrap.less'
            }
        }
}







