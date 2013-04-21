
var _ = require("lodash");

var SassExecuter = require("./SassExecuter");

module.exports = {
	SassExecuter: SassExecuter,

	compile: function(files, opts, done) {
		// Make sure that files is an array.
		if(!_.isArray(files)) {
			files = [files];
		}

		// Curry the optional opts parameter
		if(_.isFunction(opts)) {
			done = opts;
			opts = {};
		}

		// Convert to the -I switch from includeFrom
		if(opts.includeFrom) {
			_.extend(opts, {
				"-I": opts.includeFrom
			});

			delete opts.includeFrom;
		}

		var sassy = new SassExecuter();

		sassy.execute(files, opts, done);
	}
};