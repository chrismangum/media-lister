module.exports = function(grunt) {
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      stylus: {
        files: 'public/css/style.styl',
        tasks: ['stylus:compile']
      },
      jade: {
        files: 'views/*.jade',
        tasks: ['jade:compile']
      },
      js: {
        files: 'public/js/app.js',
        tasks: ['uglify']
      },
      css: {
        files: 'public/css/style.css',
        tasks: ['cssmin']
      }
    },
    cssmin: {
      compress: {
        files: {
          'public/css/style.min.css': ['public/css/style.css']
        }
      }
    },
    jade: {
      compile: {
        files: {
          "public/index.html": "views/index.jade"
        }
      }
    },
    stylus: {
      compile: {
        files: {
          "public/css/style.css": "public/css/style.styl"
        }
      }
    },
    uglify: {
      minify: {
        files: {
          'public/js/app.min.js': 'public/js/app.js'
        }
      }
    },
    jshint: {
      files: ['public/js/app.js', 'public/js/main.js'],
      options: {
        force: true,
        unused: true
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'server/app.js',
          watchedExtensions: ['js'],
          watchedFolders: ['server'],
          delayTime: 0
        }
      }
    },
    concurrent: {
      default: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  grunt.registerTask('default', [/*'compile', */'concurrent:default']);
  grunt.registerTask('compile', ['stylus:compile', 'cssmin:compress', 'jade:compile', 'uglify:minify']);
  grunt.registerTask('lint', ['jshint']);
};
