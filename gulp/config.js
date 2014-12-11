var dest = './build/';
var src = './app/';
var lib = './lib/';

module.exports = {
	browserSync: {
		open: true,
		server: {
			baseDir: dest
		},
		files: [
			dest + '**',
			// Exclude Map files
			'!' + dest + '**.map',
		],
	},
	lint: {
		// src: `{${src},gulp}**/*.js`, in es6 template syntax
		src: '{' + src + ',gulp}' + '**/*.js',
	},
	sass: {
		src: src + 'sass/**/*.{sass,scss}',
		dest: dest,
		browsers: ['last 1 version'],
	},
	icons: {
		src: [src + 'icons/*'],
		dest: [dest + 'icons'],
	},
	images: {
		src: src + 'images/**',
		dest: dest + 'images',
	},
	parse: {
		src: lib + '*',
		dest: dest,
	},
	markup: {
		src: src + 'htdocs/*',
		dest: dest,
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
			outputName: 'app.js',
		}],
	},
};
