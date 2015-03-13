/*
 * grunt-init-wp-plugin
 * http://borkweb.com
 *
 * Copyright (c) 2015 Matthew Batchelder
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description
exports.description = 'Create a WordPress plugin.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ) {
	init.process({}, [
		init.prompt( 'name', 'wp-plugin' ),
		init.prompt( 'title', 'WP Plugin' ),
		init.prompt( 'description', 'Totally sweet plugin' ),
		init.prompt( 'plugin_url', 'http://wordpress.org/plugins' ),
		init.prompt( 'author' ),
		init.prompt( 'author_uri' ),
		init.prompt( 'contributors' ),
		init.prompt( 'tags' ),
		init.prompt( 'license', 'MIT' ),
		{
			name: 'css_type',
			message: 'CSS Preprocessor: Will you use "sass", "less", or "none" for CSS with this project?',
			default: 'sass'
		}
	], function( err, props ) {
		props.devDependencies = {
			'grunt': '~0.4.5',
			'grunt-contrib-cssmin': '~0.10.0',
			'grunt-contrib-uglify': '~0.7.0',
			'grunt-contrib-watch': '~0.6.1',
			'grunt-newer': '~1.1.0'
		};

		props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
		props.singleton = props.name.replace( /-/, '_' );
		props.class_name = props.singleton.replace( /(?:^|_)\S/g, function( character ) { return character.toUpperCase(); } );

		// files to copy (and process)
		var files = init.filesToCopy( props );

		// add property named license files
		init.addLicenseFiles( files, props.license );

		// actually copy (and process) files
		init.copyAndProcess( files, props, { noProcess: 'libs/**' } );

		switch( props.css_type.toLowerCase()[0] ) {
			case 'l':
				delete files[ 'components/sass/' + props.js_safe_name + '.scss' ];
				props.devDependencies['grunt-contrib-less'] = '~0.11.2';
				props.css_type = 'less';
				break;
			case 'n':
			case undefined:
				delete files[ 'components/less/' + props.js_safe_name + '.less' ];
				delete files[ 'components/sass/' + props.js_safe_name + '.scss' ];
				props.css_type = 'none';
				break;
			default:
				delete files[ 'components/less/' + props.js_safe_name + '.less' ];
				props.devDependencies['grunt-contrib-sass'] = '~0.8.0';
				props.css_type = 'sass';
				break;
		}//end switch

		// Generate package.json file, used by npm and grunt.
		init.writePackageJSON( 'package.json', {
			name: 'wp-plugin',
			version: '1.0.0',
			devDependencies: props.devDependencies
		});

		done();
	});
};
