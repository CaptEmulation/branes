var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var reactify = require('reactify');
var less = require('gulp-less');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var path = require('path');
var watchify = require('watchify');
var browserSync = require('browser-sync');

var paths = {
	scripts: ['*.js', 'server/**/*.js'],
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

gulp.task('nodemon', function(cb) {
  var nodemon = require('gulp-nodemon');

  // We use this `called` variable to make sure the callback is only executed once
  var called = false;
  return nodemon({
    script: 'server.js',
    watch: ['server.js', 'server/**/*.*']
  })
  .on('start', function onStart() {
    if (!called) {
      cb();
    }
    called = true;
  })
  .on('restart', function onRestart() {

    // Also reload the browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

// Make sure `nodemon` is started before running `browser-sync`.
gulp.task('browser-sync', ['nodemon'], function() {
  var port = require('./server/config').port || 4000;
  browserSync.init({

    // All of the following files will be watched
    files: ['public/**/*.*'],

    // Tells BrowserSync on where the express app is running
    proxy: 'http://localhost:' + port,

    // This port should be different from the express app port
    port: 4000,

    // Which browser should we launch?
    browser: ['google chrome']
  });
});


// We create an array of dependencies. These are NPM modules you have
// installed in node_modules. Think: "require('react')" or "require('underscore')"
var dependencies = [
   'react', // react is part of this boilerplate
   'reflux',
   'jquery',
   'bootstrap'
];

var browserifyTask = function (options) {
   var appBundler = browserify({
      entries: [options.src], // Only need initial file, browserify finds the deps
      transform: [reactify], // We want to convert JSX to normal javascript
      debug: true, // Gives us sourcemapping
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
   });

   /* We set our dependencies as externals of our app bundler.
    For some reason it does not work to set these in the options above */
   appBundler.external(options.development ? dependencies : []);

   /* This is the actual rebundle process of our application bundle. It produces
    a "main.js" file in our "build" folder. */
   var rebundle = function () {
      var start = Date.now();
      console.log('Building APP bundle');
      appBundler.bundle()
         .on('error', function (err) {
           gutil.log('Browserify error' + err.message);
         })
         .pipe(source(options.name))
         .pipe(gulpif(!options.development, streamify(uglify())))
         .pipe(gulp.dest(options.dest))
         //.pipe(gulpif(options.development, livereload())) // It notifies livereload about a change if you use it
         .pipe(notify(function () {
            console.log(options.name + ' bundle built in ' + (Date.now() - start) + 'ms');
         }));
   };

   /* When we are developing we want to watch for changes and
    trigger a rebundle */
   if (options.development) {
      appBundler = watchify(appBundler);
      appBundler.on('update', rebundle);
   }

   rebundle();
};

var compile = function (options) {
   /* And now we have to create our third bundle, which are our external dependencies,
   or vendors. This is React JS, underscore, jQuery etc. We only do this when developing
   as our deployed code will be one file with all application files and vendors */
   var vendorsBundler = browserify({
      debug: options.development, // It is nice to have sourcemapping when developing
      require: options.src
   });

   /* We only run the vendor bundler once, as we do not care about changes here,
   as there are none */
   var start = new Date();
   console.log('Building ' + options.name + ' bundle');
   vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source(options.name))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
         console.log(options.name + ' bundle built in ' + (Date.now() - start) + 'ms');
      }));
};

var lessTask = function (options) {
   var run = function () {
      var start = new Date;
      console.log('Building CSS from LESS');

      gulp.src(options.src)
         .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
         }))
         .pipe(gulp.dest(options.dest))
         .pipe(notify(function () {
            console.log('LESS build in ' + (Date.now() - start) + 'ms');
         }));
   };
   run();
   gulp.watch(options.src, run);
};

var jadeTask = function (options) {
   var run = function () {
      var start = new Date();
      console.log('Building JADE templates');

      gulp.src(options.src)
         .pipe(jade())
         .pipe(gulp.dest(options.dest))
         .pipe(notify(function () {
            console.log('JADE templates built in ' + (Date.now() - start) + 'ms');
         }));
   };
   run();
   gulp.watch(options.src, run);
};

// Just running the two tasks
// Starts our development workflow
gulp.task('client', function () {

   browserifyTask({
      name: 'index.js',
      development: true,
      src: './client/js/app.js',
      dest: './public'
   });
});

gulp.task('vendors', function () {

   compile({
      name: 'vendors.js',
      development: true,
      src: dependencies,
      dest: './public'
   });
});

gulp.task('less', function () {

   lessTask({
      name: 'main.css',
      src: './client/less/resume.less',
      dest: './public/css'
   });
});

gulp.task('jade', function () {

   jadeTask({
      src: './client/jade/**/*.jade',
      dest: './public'
   });

});

gulp.task('watch', function () {
    gulp.watch(paths.allScripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch', 'client', 'vendors', 'less', 'jade', 'nodemon', 'browser-sync']);