var expect = require("expect.js");
var simulator = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("simulator", function () {

    it("service", function () {
        var spec = {
            handlers: {
                json: {
                    findMatch: function (rootPath, rootRelativePath, request) {
                        return "json";
                    }
                } 
            }
        };
        var theSimulator = simulator.create(spec);

        var simulatorRequest = {
            rootPath: ".",
            rootRelativePath: "",
            request: "request",
            contentType: "json"
        };

        var actual = theSimulator.service(simulatorRequest);

        expect(actual).to.be("json");
    });

});
