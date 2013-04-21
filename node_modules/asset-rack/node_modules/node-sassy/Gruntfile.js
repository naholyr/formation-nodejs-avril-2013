
module.exports = function(grunt) {

	var cfg = {
		jshint: {
			options: {
				node: true
			},

			all: ["index.js", "Gruntfile.js", "lib/**/*.js", "test/**/*.js"]
		},

		simplemocha: {
			options: {
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec',
				compilers: "coffee:coffee-script"
			},
			all: ["test/*.js"]
		}
	};

	grunt.initConfig(cfg);

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-simple-mocha");

	grunt.registerTask("default", ["jshint", "simplemocha"]);
	grunt.registerTask("test", ["jshint", "simplemocha"]);

};