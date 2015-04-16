var expect = require("expect.js");
var simulatorScriptInterceptor = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("simulatorScriptInterceptor", function () {

    it("noScript", function () {
        var theSimulator = {
            service: function (simulatorRequest) {
                return {
                    response: "noScript"
                };
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: "dummy",
            rootRelativePath: "",
            request: "noScript",
            contentType: "json"
        };


        var actual = theSimulator.service(simulatorRequest);
        
        expect(actual.response).to.be("noScript");
    });

    it("globalRequest", function () {
        var theSimulator = {
            service: function (simulatorRequest) {
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: "test/handler/regexp/testFiles",
            rootRelativePath: "",
            request: "globalRequest",
            contentType: "json"
        };


        var actual = theSimulator.service(simulatorRequest);

        expect(actual.response).to.be("globalRequest");
    });

    it("localResponse", function () {
        var theSimulator = {
            service: function (simulatorRequest) {
                return {
                    response: "json",
                    matchingRequestFile: "test/handler/regexp/testFiles/02_Request.json"
                };
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: "test/handler/regexp/testFiles",
            rootRelativePath: "",
            request: "localResponse",
            contentType: "json"
        };


        var actual = theSimulator.service(simulatorRequest);

        expect(actual.response).to.be("localResponse");
    });

    it("globalResponse", function () {
        var theSimulator = {
            service: function (simulatorRequest) {
                return {
                    response: "json"
                };
            }
        };

        simulatorScriptInterceptor.intercept(theSimulator);

        var simulatorRequest = {
            rootPath: "test/handler/regexp/testFiles",
            rootRelativePath: "",
            request: "globalResponse",
            contentType: "json"
        };

        var actual = theSimulator.service(simulatorRequest);

        expect(actual.response).to.be("globalResponse");
    });

});
