var fs = require("fs"),
    path = require("path");

var should = require("should");

var SassExecuter = require("../lib/SassExecuter");

describe("SassExecuter", function() {

    it("should execute for .scss files", function(done) {
        var sasser = new SassExecuter(),
            expectPath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"), 
            filepath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.scss");

        sasser.execute(filepath, function(err, css) {
            if(err){
                throw err;
            }
            var expected = fs.readFileSync(expectPath).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should execute for multiple .scss files", function(done) {
        var sasser = new SassExecuter(),
            expectPaths = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.css")
                ],
            filepath = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.scss"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.scss")
                ];

        sasser.execute(filepath, function(err, css) {
            if(err){
                throw err;
            }

            var expected = fs.readFileSync(expectPaths[0]).toString() + "\n";

            expected += fs.readFileSync(expectPaths[1]).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should execute for .sass files", function(done) {
        var sasser = new SassExecuter(),
            expectPath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"), 
            filepath = path.join(process.cwd(), "test", "fixtures", "sass", "simple.sass");

        sasser.execute(filepath, function(err, css) {
            if(err){
                throw err;
            }
            var expected = fs.readFileSync(expectPath).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should execute for multiple .sass files", function(done) {
        var sasser = new SassExecuter(),
            expectPaths = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.css"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.css")
                ],
            filepath = [
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple.sass"),
                    path.join(process.cwd(), "test", "fixtures", "sass", "simple2.sass")
                ];

        sasser.execute(filepath, function(err, css) {
            if(err){
                throw err;
            }
            
            var expected = fs.readFileSync(expectPaths[0]).toString() + "\n";

            expected += fs.readFileSync(expectPaths[1]).toString();

            css.should.equal(expected);

            done();
        });
    });

    it("should execute for .scss files with @import", function(done) {
        var sasser = new SassExecuter(),
            expectPath = path.join(process.cwd(), "test", "fixtures", "sass", "import.css"), 
            filepath = path.join(process.cwd(), "test", "fixtures", "sass", "import.scss"),
            opts = {
                "-I": path.join(process.cwd(), "test", "fixtures", "sass")
            };

        sasser.execute(filepath, opts, function(err, css) {
            if(err){
                throw err;
            }
            var expected = fs.readFileSync(expectPath).toString();

            css.should.equal(expected);

            done();
        });
    });

});