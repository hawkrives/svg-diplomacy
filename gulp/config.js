var dest = "./build/";
var src = './app/';

module.exports = {
	browserSync: {
		server: {
			baseDir: dest
		},
		files: [
			dest + "**",
			// Exclude Map files
			"!" + dest + "**.map"
		]
	},
	sass: {
		src: src + "sass/**/*.{sass,scss}",
		dest: dest
	},
	icons: {
		src: [src + "icons/*"],
		dest: [dest + "icons"],
	},
	images: {
		src: src + "images/**",
		dest: dest + "images"
	},
	markup: {
		src: src + "htdocs/*",
		dest: dest
	},
	browserify: {
		// Enable source maps
		debug: true,
		// Additional file extentions to make optional
		// extensions: ['.coffee', '.hbs'],
		// A separate bundle will be generated for each
		// bundle config in the list below
		bundleConfigs: [{
			entries: src + 'index.js',
			dest: dest,
			outputName: 'app.js'
		}]
	}
};
