module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    banner: {
      std: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
      inline: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    clean: {
      dev: [
        'js/dev/**/*.map'
      ],
      build: [
        'css/prod',
        'js/prod',
        'js/**/*.map'
      ]
    },
    compass: {
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'css/dev',
          imagesDir: 'img',
          javascriptDir: 'js',
          fontsDir: 'fonts',
          relativeAssets: true,
          environment: 'development',
          outputStyle: 'expanded',
          noLineComments: false,
          force: true,
          debugInfo: false
        }
      },
    },
    jshint: {
      options: {
        jshintrc: 'js/dev/.jshintrc'
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [ 'Gruntfile.js' ]
      },
      main: {
        src: [
          'js/dev/main.js',
          'js/dev/app.js',
          'js/dev/config.js'
        ]
      },
    },
    concat: {
      options : {
        banner: '<%= banner.std %>'
      },
      modules: {
        files : {
          'js/dev/modules.js' : [
            'js/dev/module/*.js',
            'js/dev/module/hyphenator/Hyphenator.js'
          ]
        }
      },
      plugins: {
        files : {
          'js/dev/plugins.js' : [
            'js/dev/plugin/*.js'
          ]
        }
      },
      build: {
        files : {
          'js/prod/main-<%= pkg.version %>.js' : [
            'js/dev/plugins.js',
            'js/dev/modules.js',
            'js/dev/apps.js',
            'js/dev/main.js'
          ]
        }
      }
    },
    uglify: {
      modules: {
        options : {
          banner: '<%= banner.std %>',
          //sourceMapRoot: '.',
          //sourceMap: 'js/dev/modules.js.map',
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'js/dev/modules.js' : [
            'js/dev/module/*.js'
          ]
        }
      },
      plugins: {
        options : {
          banner: '<%= banner.std %>',
          //sourceMapRoot: '.',
          //sourceMap: 'js/dev/plugins.js.map',
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'js/dev/plugins.js' : [
            'js/dev/vendor/jquery-migrate-1.1.1.js',
            'js/dev/plugin/*.js'
          ]
        }
      },
      main: {
        options : {
          banner: '<%= banner.std %>',
          //sourceMapRoot: '.',
          //sourceMap: 'js/prod/main.js.map',
          beautify: {
            width: 80,
            beautify: true
          }
        },
        files: {
          'js/prod/main-<%= pkg.version %>.js' : [
            'js/dev/plugins.js',
            'js/dev/modules.js',
            'js/dev/app.js',
            'js/dev/main.js'
          ]
        }
      },
      build: {
        options : {
          banner: '<%= banner.std %>'
        },
        files: [
          { dest: 'js/prod/plugins.js', src: [ 'js/dev/plugins.js' ] },
          { dest: 'js/prod/modules.js', src: [ 'js/dev/modules.js' ] },
          { dest: 'js/prod/main-<%= pkg.version %>.min.js', src: [ 'js/prod/main-<%= pkg.version %>.js' ] },
          {
            expand: true,
            cwd: 'js/dev/inline',
            src: [ '*.js' ],
            dest: 'js/prod/inline/'
          }
        ]
      },
      inline: {
        options : {
          banner: '<%= banner.inline %>'
        },
        files: [
          {
            expand: true,
            cwd: 'js/dev/inline',
            src: [ '*.js' ],
            dest: 'js/prod/inline/'
          }
        ]
      }
    },
    watch: {
      dev: {
        files: [
          'Gruntfile.js',
          'js/**/*.js',
          'sass/**/*.scss'
        ],
        tasks: [ 'dev' ]
      },
      build: {
        files: [
          'Gruntfile.js',
          'js/**/*.js',
          'sass/**/*.scss'
        ],
        tasks: [ 'build' ]
      }
    }
  });

  // Load grunt-compass plugin
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask( 'dev', [ 'compass', 'jshint' ]);
  grunt.registerTask( 'build', [ 'clean:build', 'compass', 'jshint', 'uglify' ]);

  // Default task.
  grunt.registerTask('default', 'build');
};
