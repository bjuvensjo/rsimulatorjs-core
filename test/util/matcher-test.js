var expect = require("expect.js");
var matcher = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("matcher", function () {

    it("getGroups should have length 3", function () {
        var request = "request";
        var candidate = "(r)[a-z]+(t)";
        
        var theMatcher = matcher.create(request, candidate);

        expect(theMatcher.getGroups().length).to.be(3);
    });

    it("matches should match", function () {
        var request = "request";
        var candidate = "r[a-z]+t";
        
        var theMatcher = matcher.create(request, candidate);

        expect(theMatcher.matches()).to.be.ok();
    });

    it("matches should not match", function () {
        var request = "request";
        var candidate = "Xr[a-z]+t";
        
        var theMatcher = matcher.create(request, candidate);

        expect(theMatcher.matches()).not.to.be.ok();        
    });
    
});
