var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
// var sass = require('gulp-sass');

gulp.task('lint', function () {
	return gulp.src('public/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
	return gulp.src('public/js/app.js')
		.pipe(browserify({
			insertGlobals: true,
		}))
		.pipe(gulp.dest('./build/js'));
});


gulp.task('compress', function () {
	return gulp.src('./build/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));
});

// gulp.task('sass', function () {
// 	return gulp.src('public/sass/style.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('./build/css'))	
// })

gulp.task('default', ['lint', 'browserify'], function () {
	gulp.watch('public/js/*.js', function () {
		gulp.run('browserify');
	});
});

gulp.task('build', ['lint', 'browserify', 'compress']);