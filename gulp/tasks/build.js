var gulp = require('gulp');

gulp.task('build', ['clean', 'lint', 'browserify', 'sass', 'images', 'fonts', 'icons', 'markup', 'parse']);
