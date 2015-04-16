var expect = require("expect.js");
var fileUtils = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("fileUtils", function () {

    it("findRequests should find two files", function () {
        var fileNames = fileUtils.findRequests(__dirname, "json");
        var actual = fileNames.length;
        var expected = 2;

        expect(actual).to.be(expected);
    });

    it("read should contain some content from the read file", function () {
        var actual = fileUtils.read(__filename);

        expect(actual).to.contain("123456");
    });
    
});
