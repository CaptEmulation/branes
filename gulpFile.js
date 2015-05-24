var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = {
	scripts: ['*.js', 'store/**/*.js', 'models/**/*.js', 'routes/**/*.js'],
	tests: ['test/**/*.js']
};

paths.allScripts = paths.scripts.concat(paths.tests);

gulp.task('lint', function () {
    return gulp.src(paths.allScripts)
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('test', function () {
	return gulp.src(paths.tests, {read: false})
		// gulp-mocha needs filepaths so you can't have any plugins before it
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function () {
    gulp.watch(paths.allScripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);