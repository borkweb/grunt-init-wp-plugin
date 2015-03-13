/*global module:false*/

module.exports = function( grunt ) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		{% if ( 'sass' === css_type ) { %}
		sass: {
			prod: {
				files: [{
					expand: true,
					cwd: 'components/sass',
					src: ['*.scss'],
					dest: '../css',
					ext: '.css'
				}]
			}
		},
		{% } else if ( 'less' === css_type ) { %}
		less: {
			prod: {
				files: [{
					expand: true,
					cwd: 'components/less',
					src: ['*.less'],
					dest: '../css',
					ext: '.css'
				}]
			}
		},
		{% } %}
		uglify: {
			compress: {
				files: [
					{
						expand: true, // enable dynamic expansion
						cwd: 'components/js/lib/', // src matches are relative to this path
						src: ['**/*.js'], // pattern to match
						dest: 'components/js/min/'
					}
				]
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'components/css/',
				src: ['*.css'],
				dest: 'components/css/min',
				ext: '.min.css'
			}
		}
		watch: {
			{% if ( 'sass' === css_type ) { %}
			sass: {
				files: ['components/sass/*.sass'],
				tasks: [
					'sass',
					'cssmin'
				]
			}
			{% } else if ( 'less' === css_type ) { %}
			less: {
				files: ['components/less/*.less'],
				tasks: [
					'less',
					'cssmin'
				]
			}
			{% } %}
		}
	});

	// Default task.
	grunt.loadNpmTasks( 'grunt-newer' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	{% if ( 'sass' === css_type ) { %}
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	{% } else if ( 'less' === css_type ) { %}
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	{% } %}
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	{% if ( 'sass' === css_type ) { %}
	grunt.registerTask( 'default', ['newer:uglify', 'sass:prod', 'cssmin'] );
	{% } else if ( 'less' === css_type ) { %}
	grunt.registerTask( 'default', ['newer:uglify', 'less:prod', 'cssmin'] );
	{% } else { %}
	grunt.registerTask( 'default', ['newer:uglify', 'less:prod', 'cssmin'] );
	{% } %}
};
