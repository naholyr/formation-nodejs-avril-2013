var fs = require("fs"),
    path = require("path"),
    spawn = require("child_process").spawn;

var _ = require("lodash"),
    CombinedStream = require("combined-stream");

var StringReader = require("./StringReader");

var SassExecuter = function() {

};

SassExecuter.prototype = {
    execute: function(filepath, opts, done) {

        // Curry the optional opts argument
        if(_.isFunction(opts)) {
            done = opts;
            opts = {};
        }

        var fileExtension = path.extname(filepath),
            sassCmd,
            fileStreams,
            output = "";

        if (fileExtension.toLowerCase() === ".scss") {
            // Create the scss switch for scss files.
            _.extend(opts, {
                // Switch, but no value
                "--scss": null
            });
        }

        sassCmd = this._makeSassProcess(opts);

        sassCmd.stdout.on("data", function(data) {
            output += data;
        });

        sassCmd.stderr.on("data", function(err) {
            return done(new Error(err));
        });

        sassCmd.on("exit", function(code) {
            if (code !== 0) {
                return done(new Error("Sass exited with non-zero code: " + code));
            }

            return done(null, output);
        });

        if(!_.isArray(filepath)) {
            // Single file
            fileStreams = fs.createReadStream(filepath).pipe(sassCmd.stdin);
        } else {
            // Multiple files
            // TODO: Check for consistent extensions?

            fileStreams = CombinedStream.create({pauseStreams: false});

            _.each(filepath, function(fp) {
                fileStreams.append(fs.createReadStream(fp));
                
                // Add a new line at the end of each file
                fileStreams.append(new StringReader("\n"));
            });

            // Kinda hacky... but that's how I role
            fileStreams._streams.pop();
        }
        
        fileStreams.pipe(sassCmd.stdin);
    },

    // Broken out so it can be unit tested easier
    _makeSassProcess: function(opts) {
        return spawn("sass", this._parseCommandArgs(opts));
    },

    // Parses a command line object into an array of arguments for spawn.
    _parseCommandArgs: function(opts) {
        if (!_.isObject(opts)) { 
            return opts;
        }

        var currKey, key, newOpts, pushVal, val;

        newOpts = [];
        currKey = "";
        pushVal = function(v) {
            newOpts.push(currKey);
            if (v) {
                return newOpts.push(v);
            }
        };

        for (key in opts) {
            if (!opts.hasOwnProperty(key)) {
                continue;
            }

            val = opts[key];
            currKey = key;
          
            if (_.isArray(val)) {
                _.each(val, pushVal);
            } else {
                pushVal(val);
            }
        }
        
        return newOpts;
    }
};

module.exports = SassExecuter;