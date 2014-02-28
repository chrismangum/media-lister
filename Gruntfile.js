module.exports = function(grunt) {
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: 'public/js/app.js',
        tasks: ['uglify']
      },
      coffee: {
        files: 'public/js/app.coffee',
        tasks: ['coffee:compile']
      }
    },
    coffee: {
      compile: {
        files: {
          'public/js/app.js': 'public/js/app.coffee',
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
  grunt.registerTask('default', ['compile', 'concurrent:default']);
  grunt.registerTask('compile', ['uglify:minify', 'coffee:compile']);
  grunt.registerTask('lint', ['jshint']);
};
