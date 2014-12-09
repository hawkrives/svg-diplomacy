var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').sass;

gulp.task('sass', function() {
	var processors = [
        autoprefixer({browsers: config.browsers}),
        // csswring
    ]

	return gulp.src(config.src)
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sass())
			.on('error', handleErrors)
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.dest))
})
