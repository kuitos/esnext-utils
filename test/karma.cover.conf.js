/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-25
 */

var base = require('./karma.base.conf');

module.exports = function(config) {

	var opts = Object.assign(base, {
		browsers: ['Chrome'],
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			reporters: [
				{type: 'lcov', dir: './coverage', subdir: '.'},
				{type: 'text-summary', dir: './coverage', subdir: '.'}
			]
		}
	});

	opts.singleRun = true;
	opts.webpack.module.postLoaders = [
		{
			test: /\.js$/,
			exclude: /node_modules|__tests__|test/,
			loader: 'istanbul-instrumenter'
		}
	];

	opts.customLaunchers = {
		Chrome_travis_ci: {
			base: 'Chrome',
			flags: ['--no-sandbox']
		}
	};

	if (process.env.TRAVIS) {
		opts.browsers = ['Chrome_travis_ci'];
	}

	config.set(opts);
};
