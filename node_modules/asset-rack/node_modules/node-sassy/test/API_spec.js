var fs = require("fs"),
    path = require("path");

var should = require("should");

var sassy = require("../lib");

describe("Sassy API", function() {

    it("should export the SassExecuter and compile", function() {
        should.exist(sassy.SassExecuter, "SassExecuter");
        should.exist(sassy.compile, "compile");
    });

    it("should compile for .scss files", function(done) {
        var expectPath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"), 
            filepath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.scss");

        sassy.compile(filepath, function(err, css) {
            if(err){
                throw err;
            }
            var expected = fs.readFileSync(expectPath).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should compile for multiple .scss files", function(done) {
        var expectPaths = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.css")
                ],
            filepath = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.scss"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.scss")
                ];

        sassy.compile(filepath, function(err, css) {
            if(err){
                throw err;
            }

            var expected = fs.readFileSync(expectPaths[0]).toString() + "\n";

            expected += fs.readFileSync(expectPaths[1]).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should compile for .sass files", function(done) {
        var expectPath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"), 
            filepath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.sass");

        sassy.compile(filepath, function(err, css) {
            if(err){
                throw err;
            }
            var expected = fs.readFileSync(expectPath).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should compile for multiple .sass files", function(done) {
        var expectPaths = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.css")
                ],
            filepath = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.sass"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.sass")
                ];

        sassy.compile(filepath, function(err, css) {
            if(err){
                throw err;
            }
            
            var expected = fs.readFileSync(expectPaths[0]).toString() + "\n";

            expected += fs.readFileSync(expectPaths[1]).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should compile for .scss files with @import", function(done) {
        var expectPath = path.join(process.cwd(), "test", "fixtures", "sass", "import.css"), 
            filepath = path.join(process.cwd(), "test", "fixtures", "sass", "import.scss"),
            opts = {
                includeFrom: path.join(process.cwd(), "test", "fixtures", "sass")
            };

        sassy.compile(filepath, opts, function(err, css) {
            if(err){
                throw err;
            }
            var expected = fs.readFileSync(expectPath).toString();

            css.should.equal(expected);

            done();
        });
    });

});