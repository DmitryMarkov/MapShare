/*globals require*/
/*jslint node: true */
'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-html-replace'); // like gulp-usemin
var sync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');

var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var notifier = require('node-notifier');
var del = require('del');


var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

/*gulp.task('clean', function (cb) {
	del(['dist/css', 'dist/js', 'dist/*.html'], cb);
});*/

gulp.task('html', function () {
	return gulp.src('app/index.html')
		.pipe(replace({
			js: 'js/app.min.js',
     css: 'css/styles.min.css'
		}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .on('error', notify)
		.pipe(gulp.dest('dist'));
});

gulp.task('concat', function () {
	return gulp.src([
      'app/**/*.js',
      'app/js/app.js'
  ])
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('uglify', ['concat'], function () {
	return gulp.src('dist/js/*')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});


gulp.task('sass', function () {
  gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('app/css'));
});


gulp.task('css', function() {
  return gulp.src([
      'app/css/bootstrap.css',
      'app/css/styles.css'
  ])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('serve', function () {
	sync({
		server: {
			baseDir: 'app'
		}
	});

	gulp.watch('app/sass/**/*.scss', ['sass', sync.reload]);
	gulp.watch(['app/index.html', 'app/js/**/*.js'], sync.reload);
});

gulp.task('publish', ['uglify', 'sass', 'css', 'html']);

gulp.task('default', ['serve']);
