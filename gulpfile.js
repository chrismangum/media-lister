var gulp = require('gulp'),
  plugin = require('gulp-load-plugins')({
    camelize: true
  }),
  wiredep = require('wiredep').stream;

var paths = {
  js: 'public/js/*.coffee',
  jade: 'views/*.jade',
  stylus: 'public/css/*.styl',
  index: 'public/index.html'
};

gulp.task('scripts', function () {
  return gulp.src(paths.js)
    .pipe(plugin.coffee())
    .pipe(plugin.uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('jade', function () {
  gulp.src(paths.jade)
    .pipe(plugin.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public/'));
});

gulp.task('stylus', function () {
  gulp.src(paths.stylus)
    .pipe(plugin.stylus({
      set: ['compress'],
      use: ['nib']
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('wiredep', function () {
  gulp.src(paths.index)
    .pipe(wiredep({
      fileTypes: {
        html: {
          replace: {
            js: '<script src="/static/{{filePath}}"></script>'
          }
        }
      }
    }))
    .pipe(gulp.dest('./public'));
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
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.index, ['wiredep']);
});

gulp.task('default', ['scripts', 'jade', 'stylus', 'watch', 'nodemon']);
