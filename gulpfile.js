var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');

gulp.task('lint', function () {
	return gulp.src('public/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
	return gulp.src('public/js/app.js')
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(gulp.dest('./build/js'));
});

gulp.task('default', ['lint', 'browserify']);