module.exports = {
	devServer: {
		open: false
	},
	css: {
		sourceMap: true
	},
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.md$/,
					loader: 'raw-loader'
				}
			]
		}
	}
};
