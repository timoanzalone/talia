var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-terser'),
    concat = require('gulp-concat');
    cleanCSS = require('gulp-clean-css');


var jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';


gulp.task('log', function() {
  gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'compressed'}))
    .on('error', gutil.log)
    .pipe(cleanCSS())
  .pipe(gulp.dest('assets'))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(['./scripts/jquery.js', './scripts/rellax.js', './scripts/swup.js', './scripts/lozad.js', './scripts/wow.js', './scripts/main.js' ])
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('js-en', function() {
  gulp.src(['./scripts/jquery.js', './scripts/rellax.js', './scripts/swup.js', './scripts/lozad.js', './scripts/wow.js', './scripts/main-en.js' ])
  .pipe(uglify())
  .pipe(concat('script-en.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);