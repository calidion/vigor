'use strict';

var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');
var sass = require('gulp-sass');

var ts = require("gulp-typescript");

gulp.task('sass', function () {
  return gulp.src('public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('public/sass/**/*.scss', ['sass']);
});

var tsProject = ts.createProject("tsconfig.json");

gulp.task("ts", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});


gulp.task('static', function () {
  return gulp.src(['lib/**/*.js', 'test/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({
    package: path.resolve('package.json')
  }, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src(['test/**/*.js', '!test/upload/**/*'])
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec',
      timeout: 50000
    }))
    .on('error', function (err) {
      mochaErr = err;
      throw err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }
  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

// gulp.task('prepublish', ['nsp']);
gulp.task('prepublish');
gulp.task('default', ['ts', 'sass', 'static', 'test', 'coveralls'], function () {
  process.exit();
});
