var gulp = require('gulp');

gulp.task('build', ['lint', 'browserify', 'sass', 'images', 'fonts', 'icons', 'markup', 'parse']);
