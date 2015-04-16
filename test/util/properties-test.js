var expect = require("expect.js");
var properties = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("properties", function () {

    it("getProperties should be empty for non-existing properties", function () {
        var theProperties = properties.getProperties("NonExisting.properties");

        expect(theProperties).to.be.empty();
    });

    it("getProperties should not be empty for non-existing properties", function () {
        var theProperties = properties.getProperties(__dirname + "/testFiles/01_.properties");

        expect(theProperties).not.to.be.empty();
    });

    it("getProperties should have expected value(s)", function () {
        var theProperties = properties.getProperties(__dirname + "/testFiles/01_.properties");

        expect(theProperties.foo).to.be("foo");
    });

});
