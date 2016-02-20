
'use strict';
module.exports = function(grunt) {

	// load all tasks
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			files: ['sass/**/*.scss'],
			tasks: 'sass:dev',
			options: {
				livereload: true
			}
		},
		sass: {
			dev: {
	  		options : {
		  		style : 'expanded'
		  	},
		  	files: {
				'css/style.css':'sass/style.scss'
				}
			},
			release: {
	  		options : {
		  		style : 'expanded'
		  	},
		  	files: {
				'css/style.css':'sass/style.scss'
				}
			},
		},
		autoprefixer: {
      options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9']
			},
			single_file: {
				src: 'css/style.css',
				dest: 'css/style.css'
			}
		},
		csscomb: {
			options: {
        config: '.csscomb.json'
      },
      files: {
        'css/style.css': ['css/style.css']
      }
		},
		cssmin: {
			release: {
				files: {
	 				'css/style.min.css': ['css/style.css']
				}
			}
		},
		concat: {
	    release: {
        src: [
          'js/skip-link-focus-fix.js',
          'js/navigation.js'
        ],
        dest: 'js/combined.min.js'
	    }
		},
		uglify: {
	    release: {
        src: 'js/combined.min.js',
        dest: 'js/combined.min.js'
	    }
		},
  	// https://www.npmjs.org/package/grunt-wp-i18n
    makepot: {
      target: {
        options: {
          domainPath: '/languages/',    // Where to save the POT file.
          potFilename: '_s.pot',   // Name of the POT file.
          type: 'wp-theme'  // Type of project (wp-plugin or wp-theme).
        }
      }
    }
	});
  grunt.registerTask( 'default', [
  	'sass:dev'
  ]);
  grunt.registerTask( 'release', [
  	'sass:release',
		'autoprefixer',
		'csscomb',
		'cssmin:release',
		'concat:release',
		'uglify:release',
		'makepot'
	]);
};
