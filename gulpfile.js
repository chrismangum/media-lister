var gulp = require('gulp'),
  plugin = require('gulp-load-plugins')({
    camelize: true
  });

var paths = {
  js: 'public/js/*.coffee'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(plugin.coffee())
    .pipe(plugin.uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('nodemon', function () {
  plugin.nodemon({
    script: 'server/app.js',
    ext: 'js,coffee',
    ignore: ['public/**', 'node_modules/**']
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('default', ['scripts', 'watch', 'nodemon']);
