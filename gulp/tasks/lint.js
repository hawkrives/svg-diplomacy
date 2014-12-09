var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('jshint-stylish');
var config = require('../config').lint;

gulp.task('lint', function() {
	return gulp.src(config.src)
		.pipe(jscs())
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
});
