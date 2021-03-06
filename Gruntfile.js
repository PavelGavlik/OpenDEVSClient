'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	try {
		yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
	} catch (e) {}

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
			templates: {
				files: ['<%= yeoman.app %>/templates/{,*/}*.html'],
				tasks: ['html2js']
			},
			livereload: {
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
				],
				tasks: ['livereload']
			}
		},
		connect: {
			livereload: {
				options: {
					port: 3501,
					// Change this to 'localhost' to access the server only from inside.
					hostname: '0.0.0.0',
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9000,
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= connect.livereload.options.port %>'
			}
		},
		clean: {
			dist: ['.tmp', '<%= yeoman.dist %>/*'],
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			]
		},
		karma: {
			unit: {
				configFile: '<%= yeoman.app %>/karma.conf.js',
				singleRun: true
			}
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/components',
				relativeAssets: true
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		concat: {
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'<%= yeoman.app %>/scripts/vendor/angular.min.js',
						'<%= yeoman.app %>/scripts/vendor/*.min.js',
						'.tmp/scripts/{,*/}*.js',
						'<%= yeoman.app %>/scripts/app.js',

						'<%= yeoman.app %>/scripts/models/MyRepository.js',
						'<%= yeoman.app %>/scripts/models/BaseDEVS.js',
						'<%= yeoman.app %>/scripts/models/CoupledDEVSPrototype.js',
						'<%= yeoman.app %>/scripts/models/DEVSRootSolverRT.js',
						'<%= yeoman.app %>/scripts/models/AtomicDEVSPrototype.js',
						'<%= yeoman.app %>/scripts/models/Port.js',
						'<%= yeoman.app %>/scripts/models/InputPort.js',
						'<%= yeoman.app %>/scripts/models/OutputPort.js',
						'<%= yeoman.app %>/scripts/models/Slot.js',
						'<%= yeoman.app %>/scripts/models/Delegate.js',
						'<%= yeoman.app %>/scripts/models/Method.js',
						'<%= yeoman.app %>/scripts/models/PrototypeObject.js',

						'<%= yeoman.app %>/scripts/controllers/*.js',
						'<%= yeoman.app %>/scripts/directives/*.js',
						'<%= yeoman.app %>/scripts/services/*.js',
						'<%= yeoman.app %>/scripts/angular-app.js'
					]
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					 // https://github.com/yeoman/grunt-usemin/issues/44
					 //collapseWhitespace: true,
					 collapseBooleanAttributes: true,
					 removeAttributeQuotes: true,
					 removeRedundantAttributes: true,
					 useShortDoctype: true,
					 removeEmptyAttributes: true,
					 removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['*.html', 'views/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>/scripts',
					src: '*.js',
					dest: '<%= yeoman.dist %>/scripts'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= yeoman.dist %>/scripts/scripts.js': [
						'<%= yeoman.dist %>/scripts/scripts.js'
					]
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'components/**/*',
						'images/{,*/}*.{gif,webp}',
						'styles/codemirror.css'
					]
				}]
			}
		},
		html2js: {
			main: {
				src: ['<%= yeoman.app %>/templates/**/*.html'],
				dest: '.tmp/scripts/templates.js'
			},
			options: {
				base: '<%= yeoman.app %>'
			}
		}
	});

	grunt.renameTask('regarde', 'watch');
	// remove when mincss task is renamed
	grunt.renameTask('mincss', 'cssmin');

	grunt.registerTask('count', 'count all lines of my project', function () {
		var done = this.async();
		require('child_process').exec('cd app; wc -l scripts/{controllers,directives,models,services,.}/*.js templates/*/* index.html styles/main.sass ../test/spec/{*,*/*}.js', function (err, stdout) {
			grunt.log.write(stdout);
			done(err);
		});
	});

	grunt.registerTask('server', [
		'clean:server',
//		'coffee:dist',
		'compass:server',
		'html2js',
		'livereload-start',
		'connect:livereload',
		'open',
		'watch'
	]);

	grunt.registerTask('test', [
		'clean:server',
//		'coffee',
		'compass',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
//		'jshint',
//		'test',
//		'coffee',
		'html2js',
		'compass:dist',
//		'useminPrepare',
		'imagemin',
		'cssmin',
		'htmlmin',
		'concat',
		'copy',
//		'cdnify',
		'usemin',
//		'ngmin',
//		'uglify'
	]);

	grunt.registerTask('default', ['build']);
};
