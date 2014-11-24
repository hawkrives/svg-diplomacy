var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var config = require('../config').sass;

gulp.task('sass', function () {
	return gulp.src(config.src)
		.pipe(sass())
		.on('error', handleErrors)
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.dest))
});
