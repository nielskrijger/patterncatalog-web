/**
 * This gulpfile is inspired by Christian Alfoni React App Boilerplate project:
 * https://github.com/christianalfoni/react-app-boilerplate/blob/master/gulpfile.js
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var streamify = require('gulp-streamify');
var livereload = require('gulp-livereload');

var notifyConsole = notify.withReporter(function (options, callback) {
    // Don't have to do anything, default writes to console
    callback();
});

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'react-router',
    'fluxible-app',
    'markdown'
];

var paths = {
    img: [
        './assets/img/*'
    ],
    js: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js'
    ],
    css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/fontawesome/css/font-awesome.min.css',
        './assets/css/*.css'
    ],
    fonts: [
        './bower_components/fontawesome/fonts/**.*'
    ]
};

var browserifyTask = function (options) {

    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: options.development, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
    });

    // Set dependencies as externals on app bundler when developing to speed up browserify task
    if (options.development) {
        dependencies.forEach(function (dep) {
            appBundler.external(dep);
        });
    }

    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Starting BROWSIFY task');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('client/client.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(rename(path.basename(options.dest)))
            .pipe(gulp.dest(path.dirname(options.dest)))
            .pipe(gulpif(options.development, livereload()))
            .pipe(notifyConsole({
                onLast: true,
                message: function() { console.log('BROWSIFY task finished in ' + (Date.now() - start) + 'ms'); }
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    // Build vendors bundle when in developing
    if (options.development) {
        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Starting VENDORS task');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest(path.dirname(options.dest)))
            .pipe(notifyConsole({
                onLast: true,
                message: function() { console.log('VENDORS task finished in ' + (Date.now() - start) + 'ms'); }
            }));
    }
};

var jsTask = function(options) {
    var start = new Date();
    console.log('Starting JS task');
    gulp.src(options.src)
        .pipe(concat(path.basename(options.dest)))
        .pipe(gulpif(!options.development, uglify()))
        .pipe(gulp.dest(path.dirname(options.dest)))
        .pipe(gulpif(options.development, livereload()))
        .pipe(notifyConsole({
            onLast: true,
            message: function() { console.log('JS task finished in ' + (Date.now() - start) + 'ms'); }
        }));
};

var cssTask = function (options) {
    var start = new Date();
    console.log('Starting CSS task');
    gulp.src(options.src)
        .pipe(concat(path.basename(options.dest)))
        .pipe(gulpif(!options.development, cssmin()))
        .pipe(gulp.dest(path.dirname(options.dest)))
        .pipe(gulpif(options.development, livereload()))
        .pipe(notifyConsole({
            onLast: true,
            message: function() { console.log('CSS task finished in ' + (Date.now() - start) + 'ms'); }
        }));
};

var imgTask = function (options) {
    var start = new Date();
    console.log('Starting IMG task');
    gulp.src(options.src)
        .pipe(gulp.dest(options.dest))
        .pipe(gulpif(options.development, livereload()))
        .pipe(notifyConsole({
            onLast: true,
            message: function() { console.log('IMG task finished in ' + (Date.now() - start) + 'ms'); }
        }));
};

var fontsTask = function (options) {
    var start = new Date();
    console.log('Starting FONTS task');
    gulp.src(options.src)
        .pipe(gulp.dest(options.dest))
        .pipe(gulpif(options.development, livereload()))
        .pipe(notifyConsole({
            onLast: true,
            message: function() { console.log('FONTS task finished in ' + (Date.now() - start) + 'ms'); }
        }));
};

function taskRunner(task, options) {
    task(options);
    if (options.development) {
        gulp.watch(options.src, function() {
            task(options)
        });
    }
}

// Starts our development workflow
gulp.task('default', function () {
    livereload.listen();
    browserifyTask({
        development: true,
        src: './client/client.js',
        dest: './build/js/main.js'
    });
    taskRunner(jsTask, {
        development: true,
        src: paths.js,
        dest: './build/js/build.js'
    });
    taskRunner(cssTask, {
        development: true,
        src: paths.css,
        dest: './build/css/main.css'
    });
    taskRunner(imgTask, {
        development: true,
        src: paths.img,
        dest: './build/img'
    });
    taskRunner(fontsTask, {
        development: true,
        src: paths.fonts,
        dest: './build/fonts'
    });
});

gulp.task('deploy', function () {
    browserifyTask({
        development: false,
        src: './client/client.js',
        dest: './dist/js/main.min.js'
    });
    taskRunner(jsTask, {
        development: false,
        src: paths.js,
        dest: './dist/js/build.min.js'
    });
    taskRunner(cssTask, {
        development: false,
        src: paths.css,
        dest: './dist/css/main.min.css'
    });
    taskRunner(imgTask, {
        development: false,
        src: paths.img,
        dest: './dist/img'
    });
    taskRunner(fontsTask, {
        development: false,
        src: paths.fonts,
        dest: './dist/fonts'
    });
});

gulp.task('server', function () {
    nodemon({
        script: 'server/server.js',
        ext: 'jsx js'
    })
    .on('restart', function () {
        console.log('restarted!')
    });
});

gulp.task('test', function () {
    return gulp.src('./build/testrunner-phantomjs.html').pipe(jasminePhantomJs());
});
