var expect = require("expect.js");
var module = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("module", function () {

    it("should be a simulator object", function () {

        var actual = module.service;

        
        expect(actual).to.be.ok();   
    });

});
