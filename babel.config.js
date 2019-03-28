
module.exports = (api) => {
	api.cache(true)
	return {
		plugins: [
			"transform-es2015-modules-commonjs"
		],
		ignore: [
			"dist",
			"node_modules",
			"babel.config.js"
		]
	}
}
