var gulp = require('gulp'),
  plugin = require('gulp-load-plugins')({
    camelize: true
  });

var paths = {
  stylus: 'public/css/*.styl',
  js: 'public/js/*.coffee'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(plugin.coffee())
    .pipe(plugin.uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(plugin.stylus({
      set: ['compress'],
      use: ['nib']
    }))
    .pipe(gulp.dest('public/css'));
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
  gulp.watch(paths.stylus, ['stylus']);
});

gulp.task('default', ['scripts', 'stylus', 'watch', 'nodemon']);
