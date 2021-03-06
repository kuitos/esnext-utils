/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-25
 */

var path = require('path');

module.exports = {

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: './',

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['mocha'],

	client: {
		mocha: {
			timeout: 15000
		}
	},

	// list of files / patterns to load in the browser
	files: [
		'test.index.js'
	],

	// list of files to exclude
	exclude: [],

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
		'test.index.js': ['webpack']
	},

	// Webpack
	webpack: {
		devtool: 'eval',
		output: {
			pathinfo: true
		},
		resolve: {
			extensions: ['', '.ts', '.js']
		},
		module: {
			preLoaders: [{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: /node_modules/,
				include: [path.join(__dirname, '../src')]
			}],
			loaders: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /(node_modules|bower_components)/,
					include: [path.join(__dirname, '../src'), path.join(__dirname, '../test')]
				}
			]
		}

	},

	// Webpack middleware
	webpackMiddleware: {
		noInfo: true
	},

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	reporters: ['mocha'],

	// web server port
	port: 9876,

	// enable / disable colors in the output (reporters and logs)
	colors: true,

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	// logLevel: config.LOG_INFO,

	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: true,

	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: false,

	// Concurrency level
	// how many browser should be started simultaneous
	concurrency: Infinity
};
