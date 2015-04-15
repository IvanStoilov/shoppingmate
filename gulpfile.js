var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var ngTemplate = require('gulp-ng-template');
var rimraf = require('rimraf');

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('sass', sassFunc);
gulp.task('watch', watchFunc);
gulp.task('templates', ['clean'], templatesFunc)
gulp.task('concat', ['templates'], concatFunc);
gulp.task('clean', cleanFunc);

function sassFunc() {
	gulp.src('app/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
}

function watchFunc() {
	watch('app/**/*.scss', function () {
		gulp.start('sass');
	});

	watch(['app/**/*.js', 'app/**/*.html'], function () {
		gulp.start('concat');
	});
}

function templatesFunc() {
	return gulp.src('app/**/*.html')
		.pipe(ngTemplate({
			moduleName: 'app.templates',
			standalone: true,
			filePath: 'templates.js',
			prefix: 'app/'
		}))
		.pipe(gulp.dest('js'));
}

function concatFunc() {
	return gulp.src([
			'js/templates.js',
			'app/**/*.module.js',
			'app/config/develop.js',
			'!app/**/tests/*.js',
			'app/**/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js'));
}

function cleanFunc(cb) {
	rimraf('./js', cb);
}
