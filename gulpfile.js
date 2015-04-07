var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('sass', sassFunc);
gulp.task('watch', watchFunc);
gulp.task('concat', concatFunc);

function sassFunc() {
	gulp.src('app/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
}

function watchFunc() {
	sassFunc();
	concatFunc();
	watch('app/**/*.scss', sassFunc);
	watch('app/**/*.js', concatFunc);
}

function concatFunc() {
	gulp.src(['app/**/*.module.js', 'app/**/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js'));
}