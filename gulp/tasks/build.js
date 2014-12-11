var gulp = require('gulp');

gulp.task('build', ['lint', 'browserify', 'sass', 'images', 'icons', 'markup', 'parse']);
