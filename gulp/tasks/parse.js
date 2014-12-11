var gulp = require('gulp');
var config = require('../config').parse

gulp.task('parse', function() {
	return gulp.src(config.src)
		.pipe(gulp.dest(config.dest));
});
