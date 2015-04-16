var gulp = require('gulp');
var jshint = require('gulp-jshint');
var log = require('rsimulatorjs-log');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
    // return gulp.src(['src/**/*', 'test/**/*js', 'test/**/*json'])
    return gulp.src(['src/**/*', 'test/**/*js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('test-single', function () {
    log.setGlobalLogLevel('error'); // to get rid of logs...
    return gulp.src('test/**/*-test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['jshint', 'test-single'], function() {
    gulp.watch(['src/**', 'test/**'], ['jshint', 'test-single']);    
});
