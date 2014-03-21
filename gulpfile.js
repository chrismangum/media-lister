var gulp = require('gulp'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  nodemon = require('gulp-nodemon');

var paths = {
  js: 'public/js/*.coffee'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server/app.js',
    ext: 'js,coffee',
    ignore: ['public/**', 'node_modules/**']
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('default', ['scripts', 'watch', 'nodemon']);
