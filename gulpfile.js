var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var ngTemplate = require('gulp-ng-template');

gulp.task('default', function() {
	// place code for your default task here
});

gulp.task('sass', sassFunc);
gulp.task('watch', watchFunc);
gulp.task('templates', templatesFunc)
gulp.task('concat', ['templates'], concatFunc);

function sassFunc() {
	gulp.src('app/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
}

function watchFunc() {
	sassFunc();
	concatFunc();
	templatesFunc();
	watch('app/**/*.scss', sassFunc);
	watch('app/**/*.js', concatFunc);
	watch('app/**/*.html', templatesFunc);
}

function templatesFunc() {
	gulp.src('app/**/*.html')
		.pipe(ngTemplate({
			moduleName: 'app.templates',
			standalone: true,
			filePath: 'templates.js',
			prefix: 'app/'
		}))
		.pipe(gulp.dest('js'));
}

function concatFunc() {
	gulp.src(['js/templates.js', 'app/**/*.module.js', '!app/**/tests/*.js', 'app/**/*.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('js'));
}