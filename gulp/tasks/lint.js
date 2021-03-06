var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('jshint-stylish');
var config = require('../config').lint;

gulp.task('lint', function() {
	return gulp.src(config.src)
		.pipe(jscs())
		.on('error', handleErrors)
		.pipe(jshint('.jshintrc'))
		.on('error', handleErrors)
		.pipe(jshint.reporter('jshint-stylish'))
});
