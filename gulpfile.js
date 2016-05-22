/*globals require*/
/*jslint node: true */
'use strict';
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngannotate = require('gulp-ng-annotate'),
    replace = require('gulp-html-replace'), // like gulp-usemin
    sync = require('browser-sync'),
    htmlmin = require('gulp-htmlmin'),

    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    notifier = require('node-notifier'),
    del = require('del');


var notify = function(error) {
  var message = 'In: ', title = 'Error: ';

  if (error.description) {
    title += error.description;
  }
  else if (error.message) {
    title += error.message;
  }

  if (error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if (error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

gulp.task('clean', function() {
	del(['dist/**/*']);
});

gulp.task('copy', ['clean'], function() {
  gulp.src(['app/fonts/**/*.{ttf,woff,eof,svg}*','bower_components/font-awesome/fonts/*.{ttf,woff,eof,svg}'])
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('app/images/**/*')
    .pipe(gulp.dest('./dist/images'));
  gulp.src(['app/*.ico', 'app/robots.txt', 'app/lang/*.json'])
    .pipe(gulp.dest('./dist'));
  gulp.src(['app/templates/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/templates'));
});

gulp.task('html', function() {
	return gulp.src(['app/index.html'])
		.pipe(replace({
			js: 'js/app.min.js',
     css: 'css/styles.min.css'
		}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .on('error', notify)
		.pipe(gulp.dest('dist'));
});

gulp.task('concat', function() {
	return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/tether/dist/js/tether.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'static/mdb/js/mdbf2.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'app/js/*.js'
  ])
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('uglify', ['concat'], function() {
	return gulp.src('dist/js/*')
    .pipe(ngannotate({add:true}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});


gulp.task('sass', function() {
  gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', notify))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('app/css'));
});


gulp.task('css', function() {
  return gulp.src([
      'bower_components/font-awesome/css/font-awesome.css',
      'app/css/styles.css'
  ])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('serve', function() {
	sync({
		server: {
			baseDir: ''
		}
	});

	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch(['app/index.html', 'app/templates/*.html', 'app/js/**/*.js', 'app/css/styles.css'], sync.reload);
});

gulp.task('publish', ['copy','uglify', 'sass', 'css', 'html']);

gulp.task('default', ['serve']);
